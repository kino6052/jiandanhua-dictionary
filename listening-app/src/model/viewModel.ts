import { computed, signal } from "@preact/signals";
import { defaultShuffle, filterPool, selectSession, type Shuffle } from "./selection";
import { buildReport, scoreSample } from "./scoring";
import type {
  Difficulty,
  Mode,
  Report,
  Sample,
  SampleRecord,
  SyllableResult,
} from "./types";

export type Phase = "setup" | "drilling" | "report";
export type SubPhase = "answering" | "feedback";

export interface ViewModelDeps {
  shuffle?: Shuffle;
}

export class ViewModel {
  private readonly samples: Sample[];
  private readonly shuffle: Shuffle;

  // Setup signals — editable only while phase === "setup".
  readonly mode = signal<Mode>("sounds");
  readonly difficulty = signal<Difficulty>("L1");
  readonly contrast = signal<string | "all">("all");
  readonly count = signal<number>(10);

  // Session signals — set by startSession(), read-only after.
  readonly phase = signal<Phase>("setup");
  readonly queue = signal<Sample[]>([]);
  readonly index = signal<number>(0);
  readonly records = signal<SampleRecord[]>([]);

  // Current-sample signals — reset on every next()/startSession().
  readonly subPhase = signal<SubPhase>("answering");
  readonly input = signal<string>("");
  readonly playCount = signal<number>(0);
  readonly speed = signal<number>(1);
  readonly currentResult = signal<SyllableResult[] | null>(null);

  constructor(samples: Sample[], deps: ViewModelDeps = {}) {
    this.samples = samples;
    this.shuffle = deps.shuffle ?? defaultShuffle;
  }

  readonly currentSample = computed(() => this.queue.value[this.index.value] ?? null);

  readonly progress = computed(() => ({
    position: this.index.value + 1,
    total: this.queue.value.length,
  }));

  readonly canVerify = computed(() => this.subPhase.value === "answering");

  readonly isLastSample = computed(() => this.index.value === this.queue.value.length - 1);

  readonly availableCount = computed(
    () => filterPool(this.samples, this.difficulty.value, this.contrast.value).length,
  );

  readonly report = computed<Report | null>(() =>
    this.phase.value === "report" ? buildReport(this.records.value) : null,
  );

  setMode(mode: Mode) {
    if (this.phase.value !== "setup") return;
    this.mode.value = mode;
  }

  setDifficulty(difficulty: Difficulty) {
    if (this.phase.value !== "setup") return;
    this.difficulty.value = difficulty;
  }

  setContrast(contrast: string | "all") {
    if (this.phase.value !== "setup") return;
    this.contrast.value = contrast;
  }

  setCount(count: number) {
    if (this.phase.value !== "setup") return;
    this.count.value = count;
  }

  startSession() {
    if (this.phase.value !== "setup") return;
    const queue = selectSession(
      this.samples,
      this.difficulty.value,
      this.contrast.value,
      this.count.value,
      this.shuffle,
    );
    if (queue.length === 0) return;

    this.queue.value = queue;
    this.index.value = 0;
    this.records.value = [];
    this.resetCurrentSampleSignals();
    this.phase.value = "drilling";
  }

  play() {
    if (this.phase.value !== "drilling") return;
    this.playCount.value += 1;
  }

  setSpeed(rate: number) {
    if (this.phase.value !== "drilling") return;
    this.speed.value = rate;
  }

  updateInput(value: string) {
    if (this.subPhase.value !== "answering") return;
    this.input.value = value;
  }

  verify() {
    if (this.subPhase.value !== "answering") return;
    const sample = this.currentSample.value;
    if (!sample) return;

    const record = scoreSample(sample, this.input.value, this.playCount.value, this.mode.value);
    this.records.value = [...this.records.value, record];
    this.currentResult.value = record.syllables;
    this.subPhase.value = "feedback";
  }

  next() {
    if (this.subPhase.value !== "feedback") return;
    if (this.isLastSample.value) {
      this.phase.value = "report";
      return;
    }
    this.index.value += 1;
    this.resetCurrentSampleSignals();
  }

  reset() {
    this.phase.value = "setup";
    this.queue.value = [];
    this.index.value = 0;
    this.records.value = [];
    this.resetCurrentSampleSignals();
  }

  private resetCurrentSampleSignals() {
    this.subPhase.value = "answering";
    this.input.value = "";
    this.playCount.value = 0;
    this.currentResult.value = null;
  }
}
