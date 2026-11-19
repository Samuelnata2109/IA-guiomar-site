import assert from "node:assert/strict";
import { test } from "node:test";
import { emptyPolicy, learn, obstacle, simulate, type Input } from "../src/features/laboratorio/game/training";

const input: Input = {
  examples: { A: "peça", B: "cápsula", C: "peça", D: "cápsula" },
  order: ["inspect", "collect", "deliver"],
  avoid: true,
  priority: "cápsula",
  explore: true,
};

test("classification uses supplied labels and varied examples improve generalization", () => {
  const few = { ...input, examples: { A: "peça", B: "cápsula" } } satisfies Input;
  assert.equal(simulate("classify", few, emptyPolicy).steps.filter(step => step.correct).length, 2);
  assert.equal(simulate("patterns", few, emptyPolicy).steps.filter(step => step.correct).length, 0);
  const varied = simulate("patterns", input, emptyPolicy);
  assert.equal(varied.success, true);
  assert.equal(varied.steps.filter(step => step.correct).length, 2);
  const wrong = simulate("classify", { ...few, examples: { A: "cápsula", B: "peça" } }, emptyPolicy);
  assert.equal(wrong.steps.filter(step => step.correct === false).length, 2);
});

test("planning avoids the barrier and stops when a safety rule is missing", () => {
  const plan = simulate("avoid", input, emptyPolicy);
  assert.equal(plan.success, true);
  assert.equal(plan.steps.filter(step => step.avoided).length, 1);
  assert.ok(plan.steps.every(step => step.position.x !== obstacle.x || step.position.z !== obstacle.z));
  const blocked = simulate("avoid", { ...input, avoid: false }, emptyPolicy);
  assert.equal(blocked.success, false);
  assert.ok(blocked.steps.every(step => step.action === "scan"));
});

test("the delivery sequence carries objects in the selected priority and detects incorrect ordering", () => {
  const plan = simulate("deliver", input, emptyPolicy);
  assert.equal(plan.success, true);
  assert.equal(plan.steps.find(step => step.action === "pickup")?.cargo?.category, "cápsula");
  assert.ok(plan.steps.some(step => step.action === "move" && step.cargo));
  assert.equal(plan.steps.filter(step => step.delivered).length, 2);
  const reversed = simulate("deliver", { ...input, order: ["deliver", "collect", "inspect"] }, emptyPolicy);
  assert.equal(reversed.success, false);
  assert.ok(reversed.steps.every(step => !step.delivered));
});

test("route choice learns from the outcomes recorded after each attempt", () => {
  const first = simulate("reward", input, emptyPolicy).steps.at(-1)!;
  assert.deepEqual([first.path, first.reward], ["short", -3]);
  const secondPolicy = learn(emptyPolicy, first.path!, first.reward!);
  const second = simulate("reward", input, secondPolicy).steps.at(-1)!;
  assert.deepEqual([second.path, second.reward], ["safe", 4]);
  const thirdPolicy = learn(secondPolicy, second.path!, second.reward!);
  assert.deepEqual(thirdPolicy, { short: { count: 1, value: -3 }, safe: { count: 1, value: 4 } });
  assert.equal(simulate("reward", { ...input, explore: false }, thirdPolicy).steps.at(-1)?.path, "safe");
});

test("the autonomous challenge combines sensing, classification, navigation and delivery", () => {
  const plan = simulate("autonomous", input, emptyPolicy);
  assert.equal(plan.success, true);
  assert.equal(plan.steps.filter(step => step.correct).length, 2);
  assert.equal(plan.steps.filter(step => step.delivered).length, 2);
  assert.equal(plan.steps.filter(step => step.avoided).length, 1);
  const misclassified = simulate("autonomous", { ...input, examples: { A: "peça", B: "cápsula" } }, emptyPolicy);
  assert.equal(misclassified.success, false);
  assert.equal(misclassified.steps.filter(step => step.delivered === false).length, 2);
});
