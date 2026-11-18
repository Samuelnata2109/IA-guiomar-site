import React from 'react';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import ReactThreeTestRenderer from '@react-three/test-renderer';
import { MovingByte } from '../src/features/code-quest/components/AdventureWorld';
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
(globalThis as any).self = { requestAnimationFrame: () => 0, cancelAnimationFrame: () => {} };

test('BYTE moves to the actual world coordinates and turns after a command', async () => {
  const renderer = await ReactThreeTestRenderer.create(<MovingByte world={{ x: 0, z: 4, direction: 0 }} state="idle" active reduced={false} />);
  const model = renderer.scene.children[0].instance;
  assert.equal(model.position.z, 4);
  await renderer.update(<MovingByte world={{ x: 0, z: 3, direction: 1 }} state="moving" active reduced={false} />);
  await renderer.advanceFrames(1, 0.1);
  assert.ok(model.position.z < 4 && model.position.z > 3);
  await renderer.advanceFrames(2, 0.1);
  assert.equal(model.position.z, 3);
  assert.ok(Math.abs(model.rotation.y - Math.PI / 2) < 0.001);
  await renderer.unmount();
});

test('reduced motion applies real movement immediately', async () => {
  const renderer = await ReactThreeTestRenderer.create(<MovingByte world={{ x: 0, z: 4, direction: 0 }} state="idle" active reduced />);
  await renderer.update(<MovingByte world={{ x: 2, z: 3, direction: 2 }} state="moving" active reduced />);
  await renderer.advanceFrames(1, 0.01);
  const model = renderer.scene.children[0].instance;
  assert.equal(model.position.x, 2);
  assert.equal(model.position.z, 3);
  await renderer.unmount();
});
