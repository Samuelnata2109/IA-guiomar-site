import assert from "node:assert/strict";
import { test } from "node:test";
import { evaluateMission, missions } from "../src/features/code-quest/game/aiMissions";

test("the six AI missions reject incomplete rounds and accept completed activities", () => {
  const solutions = [
    { labels: { alarm: "rule", voice: "ai", sum: "rule", spam: "ai" }, selected: [] },
    { labels: {}, selected: ["sheet", "bottle", "box"] },
    { labels: {}, selected: ["small", "large"] },
    { labels: { "frame-1": "round", "frame-2": "corner", "frame-3": "review" }, selected: [] },
    { labels: {}, selected: ["goal", "context", "detail", "limit"] },
    { labels: {}, selected: ["capture", "check", "train", "predict", "route", "notify"] },
  ];
  assert.equal(missions.length, solutions.length);
  missions.forEach((mission, index) => {
    assert.equal(evaluateMission(mission, { labels: {}, selected: [] }).passed, false, mission.title);
    assert.equal(evaluateMission(mission, solutions[index]).passed, true, mission.title);
  });
});

test("incorrect labels change predictions for the same test samples", () => {
  const clean = evaluateMission(missions[2], { labels: {}, selected: ["small", "large"] });
  const noisy = evaluateMission(missions[2], { labels: {}, selected: ["small", "large", "wrong"] });
  assert.match(clean.observations[1], /previsão: plástico/);
  assert.match(noisy.observations[1], /previsão: papel/);
  assert.equal(noisy.passed, false);
});

test("the final flow needs training and checks image quality before inference", () => {
  const run = (selected: string[]) => evaluateMission(missions[5], { labels: {}, selected });
  assert.match(run(["capture", "check", "predict", "route", "notify"]).observations[0], /exemplos rotulados/);
  assert.equal(run(["capture", "train", "predict", "check", "route", "notify"]).passed, false);
  const result = run(["capture", "check", "train", "predict", "route", "notify"]);
  assert.equal(result.passed, true);
  assert.match(result.observations[1], /revisão humana, sem previsão nem envio/);
});
