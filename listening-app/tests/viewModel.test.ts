import { describe, expect, test } from "bun:test";
import { ViewModel } from "../src/model/viewModel";
import type { Sample } from "../src/model/types";

function makeSample(transcript: string, syllables: string[]): Sample {
  return {
    file: `audio/${transcript}.001.mp3`,
    transcript,
    syllables,
    syllableCount: syllables.length,
    difficulty: "L1",
    hasTones: false,
    contrasts: [],
  };
}

const identity = <T>(xs: T[]): T[] => xs.slice();

const samples: Sample[] = [
  makeSample("ni-hao", ["ni", "hao"]),
  makeSample("xie-xie", ["xie", "xie"]),
];

describe("ViewModel setup phase", () => {
  test("starts in setup with defaults", () => {
    const vm = new ViewModel(samples, { shuffle: identity });
    expect(vm.phase.value).toBe("setup");
    expect(vm.mode.value).toBe("sounds");
    expect(vm.difficulty.value).toBe("L1");
    expect(vm.contrast.value).toBe("all");
  });

  test("setup setters update signals while in setup phase", () => {
    const vm = new ViewModel(samples, { shuffle: identity });
    vm.setMode("sounds_tones");
    vm.setDifficulty("L2");
    vm.setContrast("n_final");
    vm.setCount(5);
    expect(vm.mode.value).toBe("sounds_tones");
    expect(vm.difficulty.value).toBe("L2");
    expect(vm.contrast.value).toBe("n_final");
    expect(vm.count.value).toBe(5);
  });

  test("availableCount reflects the current filter", () => {
    const vm = new ViewModel(samples, { shuffle: identity });
    expect(vm.availableCount.value).toBe(2);
    vm.setDifficulty("L3");
    expect(vm.availableCount.value).toBe(0);
  });

  test("startSession does nothing when the filtered pool is empty", () => {
    const vm = new ViewModel(samples, { shuffle: identity });
    vm.setDifficulty("L4");
    vm.startSession();
    expect(vm.phase.value).toBe("setup");
  });
});

describe("ViewModel session flow", () => {
  test("startSession moves to drilling with a shuffled, capped queue", () => {
    const vm = new ViewModel(samples, { shuffle: identity });
    vm.setCount(2);
    vm.startSession();
    expect(vm.phase.value).toBe("drilling");
    expect(vm.queue.value).toHaveLength(2);
    expect(vm.index.value).toBe(0);
    expect(vm.subPhase.value).toBe("answering");
  });

  test("setup edits are ignored once a session has started", () => {
    const vm = new ViewModel(samples, { shuffle: identity });
    vm.startSession();
    vm.setMode("sounds_tones");
    vm.setDifficulty("L2");
    expect(vm.mode.value).toBe("sounds");
    expect(vm.difficulty.value).toBe("L1");
  });

  test("play increments playCount only while drilling", () => {
    const vm = new ViewModel(samples, { shuffle: identity });
    expect(vm.playCount.value).toBe(0);
    vm.play(); // no-op: still in setup
    expect(vm.playCount.value).toBe(0);
    vm.startSession();
    vm.play();
    vm.play();
    expect(vm.playCount.value).toBe(2);
  });

  test("verify scores the current sample, records it, and switches to feedback", () => {
    const vm = new ViewModel(samples, { shuffle: identity });
    vm.startSession();
    vm.updateInput("ni hao");
    vm.verify();
    expect(vm.subPhase.value).toBe("feedback");
    expect(vm.records.value).toHaveLength(1);
    expect(vm.currentResult.value).not.toBeNull();
    expect(vm.records.value[0]!.earned).toBe(2);
  });

  test("verify is a no-op if called twice for the same sample", () => {
    const vm = new ViewModel(samples, { shuffle: identity });
    vm.startSession();
    vm.updateInput("ni hao");
    vm.verify();
    vm.updateInput("something else");
    vm.verify(); // should be ignored: subPhase is already "feedback"
    expect(vm.records.value).toHaveLength(1);
    expect(vm.records.value[0]!.answer).toBe("ni hao");
  });

  test("updateInput is ignored during feedback", () => {
    const vm = new ViewModel(samples, { shuffle: identity });
    vm.startSession();
    vm.updateInput("ni hao");
    vm.verify();
    vm.updateInput("changed");
    expect(vm.input.value).toBe("ni hao");
  });

  test("next() resets playCount/input and advances index", () => {
    const vm = new ViewModel(samples, { shuffle: identity });
    vm.startSession();
    vm.play();
    vm.play();
    vm.updateInput("ni hao");
    vm.verify();
    vm.next();
    expect(vm.index.value).toBe(1);
    expect(vm.subPhase.value).toBe("answering");
    expect(vm.input.value).toBe("");
    expect(vm.playCount.value).toBe(0);
    expect(vm.currentResult.value).toBeNull();
  });

  test("next() is a no-op while still answering", () => {
    const vm = new ViewModel(samples, { shuffle: identity });
    vm.startSession();
    vm.next();
    expect(vm.index.value).toBe(0);
    expect(vm.phase.value).toBe("drilling");
  });

  test("next() on the last sample moves to the report phase", () => {
    const vm = new ViewModel(samples, { shuffle: identity });
    vm.startSession();

    vm.updateInput("ni hao");
    vm.verify();
    vm.next();

    expect(vm.phase.value).toBe("drilling");
    expect(vm.isLastSample.value).toBe(true);

    vm.updateInput("xie xie");
    vm.verify();
    vm.next();

    expect(vm.phase.value).toBe("report");
  });

  test("full scripted run produces a report with two records and correct totals", () => {
    const vm = new ViewModel(samples, { shuffle: identity });
    vm.startSession();

    vm.play(); // 1 play, free
    vm.updateInput("ni hao");
    vm.verify();
    vm.next();

    vm.play();
    vm.play(); // 2 plays -> 1 extra
    vm.updateInput("xie xie");
    vm.verify();
    vm.next();

    expect(vm.phase.value).toBe("report");
    const report = vm.report.value;
    expect(report).not.toBeNull();
    expect(report!.records).toHaveLength(2);
    expect(report!.totalPossible).toBe(4);
    expect(report!.totalEarned).toBe(4);
    expect(report!.totalExtraPlays).toBe(1);
    expect(report!.accuracyPct).toBe(100);
    expect(report!.finalPct).toBe(99);
    expect(report!.band).toBe("green");
  });

  test("report is null outside the report phase", () => {
    const vm = new ViewModel(samples, { shuffle: identity });
    expect(vm.report.value).toBeNull();
    vm.startSession();
    expect(vm.report.value).toBeNull();
  });

  test("reset() returns to setup and clears session state", () => {
    const vm = new ViewModel(samples, { shuffle: identity });
    vm.startSession();
    vm.updateInput("ni hao");
    vm.verify();
    vm.reset();
    expect(vm.phase.value).toBe("setup");
    expect(vm.queue.value).toHaveLength(0);
    expect(vm.records.value).toHaveLength(0);
    expect(vm.index.value).toBe(0);
  });
});
