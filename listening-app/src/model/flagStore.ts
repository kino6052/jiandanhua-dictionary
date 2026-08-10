import { signal } from "@preact/signals";

const STORAGE_KEY = "listening-app:flagged-files";

/**
 * Minimal storage interface, matching the subset of the Web Storage API
 * (localStorage) this module needs. Injectable so tests can use an
 * in-memory fake instead of depending on a real browser environment.
 */
export interface KeyValueStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export function createMemoryStorage(): KeyValueStorage {
  const map = new Map<string, string>();
  return {
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => {
      map.set(key, value);
    },
  };
}

function safeLocalStorage(): KeyValueStorage {
  try {
    if (typeof localStorage !== "undefined") return localStorage;
  } catch {
    // localStorage can throw (e.g. disabled cookies) even when it exists.
  }
  return createMemoryStorage();
}

function load(storage: KeyValueStorage): Set<string> {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

/**
 * A small, self-contained store for "flag this audio file as bad" --
 * deliberately independent of the session ViewModel, since flags persist
 * across sessions and reloads, and flagging never changes what a session
 * selects (see DESIGN discussion: flags are a note for manual cleanup, not
 * an exclusion filter).
 */
export function createFlagStore(storage: KeyValueStorage = safeLocalStorage()) {
  const flaggedFiles = signal<Set<string>>(load(storage));

  function persist(next: Set<string>) {
    flaggedFiles.value = next;
    storage.setItem(STORAGE_KEY, JSON.stringify([...next]));
  }

  function isFlagged(fileName: string): boolean {
    return flaggedFiles.value.has(fileName);
  }

  function toggleFlag(fileName: string) {
    const next = new Set(flaggedFiles.value);
    if (next.has(fileName)) next.delete(fileName);
    else next.add(fileName);
    persist(next);
  }

  function unflag(fileName: string) {
    if (!flaggedFiles.value.has(fileName)) return;
    const next = new Set(flaggedFiles.value);
    next.delete(fileName);
    persist(next);
  }

  function clearAll() {
    persist(new Set());
  }

  return { flaggedFiles, isFlagged, toggleFlag, unflag, clearAll };
}

/** The single store instance the app actually uses. */
export const flagStore = createFlagStore();
