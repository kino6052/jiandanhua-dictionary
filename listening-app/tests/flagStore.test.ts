import { describe, expect, test } from "bun:test";
import { createFlagStore, createMemoryStorage } from "../src/model/flagStore";

describe("flagStore", () => {
  test("starts with no flags when storage is empty", () => {
    const store = createFlagStore(createMemoryStorage());
    expect(store.flaggedFiles.value.size).toBe(0);
    expect(store.isFlagged("bad.001.mp3")).toBe(false);
  });

  test("toggleFlag adds a file, toggling again removes it", () => {
    const store = createFlagStore(createMemoryStorage());
    store.toggleFlag("bad.001.mp3");
    expect(store.isFlagged("bad.001.mp3")).toBe(true);
    store.toggleFlag("bad.001.mp3");
    expect(store.isFlagged("bad.001.mp3")).toBe(false);
  });

  test("tracks multiple flagged files independently", () => {
    const store = createFlagStore(createMemoryStorage());
    store.toggleFlag("a.001.mp3");
    store.toggleFlag("b.001.mp3");
    expect(store.flaggedFiles.value).toEqual(new Set(["a.001.mp3", "b.001.mp3"]));
  });

  test("unflag removes a specific file, no-op if not flagged", () => {
    const store = createFlagStore(createMemoryStorage());
    store.toggleFlag("a.001.mp3");
    store.unflag("a.001.mp3");
    expect(store.isFlagged("a.001.mp3")).toBe(false);
    store.unflag("never-flagged.mp3"); // should not throw
    expect(store.flaggedFiles.value.size).toBe(0);
  });

  test("clearAll empties the flag set", () => {
    const store = createFlagStore(createMemoryStorage());
    store.toggleFlag("a.001.mp3");
    store.toggleFlag("b.001.mp3");
    store.clearAll();
    expect(store.flaggedFiles.value.size).toBe(0);
  });

  test("persists across store instances sharing the same storage backend", () => {
    const storage = createMemoryStorage();
    const store1 = createFlagStore(storage);
    store1.toggleFlag("a.001.mp3");

    const store2 = createFlagStore(storage);
    expect(store2.isFlagged("a.001.mp3")).toBe(true);
  });

  test("survives malformed JSON in storage by starting empty", () => {
    const storage = createMemoryStorage();
    storage.setItem("listening-app:flagged-files", "{not valid json");
    const store = createFlagStore(storage);
    expect(store.flaggedFiles.value.size).toBe(0);
  });
});
