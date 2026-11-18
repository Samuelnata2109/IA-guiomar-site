import React from "react";
import { test } from "node:test";
import assert from "node:assert/strict";
import ReactThreeTestRenderer from "@react-three/test-renderer";
import { Group } from "three";
import { Robot } from "../src/features/laboratorio/components/RobotScene";
import { executeRobotCommand, initialRobot } from "../src/features/laboratorio/game/robotExecution";
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
// Three expects the browser animation context even when WebGL is mocked.
(globalThis as any).self = {
  requestAnimationFrame: () => 0,
  cancelAnimationFrame: () => {},
};
const base = {
  ...initialRobot,
  animate: true,
  executionId: 1,
  phase: "idle" as const,
  onApplied: (_id: number) => {},
  onCelebrated: (_id: number) => {},
  onFailure: () => {},
};

test("command executor applies real state changes, rejects invalid input and leaves prior state intact", () => {
  const before = { ...initialRobot };
  assert.equal(
    executeRobotCommand("robo.led.ligar();", before, false).next.led,
    true,
  );
  assert.equal(
    executeRobotCommand('interface.cor = "ciano";', before, false).next.color,
    "#38bdf8",
  );
  assert.equal(
    executeRobotCommand("robo.mover(1);", before, false).next.position,
    1,
  );
  assert.equal(
    executeRobotCommand("robo.girar(360);", before, false).next.spin,
    1,
  );
  assert.throws(
    () => executeRobotCommand("window.alert(1)", before, false),
    /Comando não reconhecido/,
  );
  assert.throws(
    () =>
      executeRobotCommand(
        "robo.mover(1);",
        { ...before, position: NaN },
        false,
      ),
    /Estado do robô inválido/,
  );
  assert.deepEqual(before, initialRobot);
});

test("existing robot geometry is preserved and running completes only when its transform settles", async () => {
  const applied: number[] = [];
  const renderer = await ReactThreeTestRenderer.create(
    <Robot
      {...base}
      phase="running"
      position={1}
      spin={1}
      onApplied={(id) => applied.push(id)}
    />,
  );
  const root = renderer.scene.children[0].instance as Group;
  let meshes = 0;
  root.traverse((object) => {
    if (object.type === "Mesh") meshes++;
  });
  assert.equal(meshes, 11);
  await renderer.advanceFrames(10, 1 / 60);
  assert.deepEqual(applied, []);
  await renderer.advanceFrames(140, 1 / 60);
  assert.deepEqual(applied, [1]);
  assert.ok(Math.abs(root.position.x - 0.65) < 0.003);
  assert.ok(Math.abs(root.rotation.y - Math.PI * 2) < 0.006);
  await renderer.advanceFrames(30, 1 / 60);
  assert.deepEqual(applied, [1]);
  await renderer.unmount();
});

test("hover turns the existing head toward the control; error tilts it without changing the model", async () => {
  const renderer = await ReactThreeTestRenderer.create(
    <Robot {...base} phase="hover" />,
  );
  const root = renderer.scene.children[0].instance as Group;
  const head = root.children[0].children[0];
  await renderer.advanceFrames(40, 1 / 60);
  assert.ok(head.rotation.y < -0.4);
  await renderer.update(<Robot {...base} phase="error" />);
  await renderer.advanceFrames(40, 1 / 60);
  assert.ok(head.rotation.z > 0.2);
  await renderer.unmount();
});

test("success celebrates once and reduced motion applies commands without running frame loops", async () => {
  const celebrated: number[] = [];
  const renderer = await ReactThreeTestRenderer.create(
    <Robot
      {...base}
      phase="success"
      onCelebrated={(id) => celebrated.push(id)}
    />,
  );
  const root = renderer.scene.children[0].instance as Group;
  await renderer.advanceFrames(12, 1 / 60);
  assert.ok(root.children[0].position.y > 0.1);
  assert.deepEqual(celebrated, []);
  await renderer.advanceFrames(60, 1 / 60);
  assert.deepEqual(celebrated, [1]);
  const applied: number[] = [];
  await renderer.update(
    <Robot
      {...base}
      executionId={2}
      animate={false}
      phase="running"
      position={-1}
      spin={2}
      onApplied={(id) => applied.push(id)}
    />,
  );
  assert.deepEqual(applied, [2]);
  assert.equal(root.position.x, -0.65);
  assert.equal(root.rotation.y, Math.PI * 4);
  assert.equal(root.children[0].position.y, 0);
  await renderer.unmount();
});
