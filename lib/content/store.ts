import { promises as fs } from "fs";
import path from "path";
import { getDefaultContent } from "./default-content";
import type { ContentKey, ContentStore } from "@/lib/api/types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "content.json");

async function ensureStore(): Promise<ContentStore> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as ContentStore;
  } catch {
    const defaults = getDefaultContent();
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(defaults, null, 2), "utf-8");
    return defaults;
  }
}

export async function readStore(): Promise<ContentStore> {
  return ensureStore();
}

export async function writeStore(store: ContentStore): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), "utf-8");
}

export async function getSection<K extends ContentKey>(
  key: K,
): Promise<ContentStore[K]> {
  const store = await readStore();
  return store[key];
}

export async function updateSection<K extends ContentKey>(
  key: K,
  value: ContentStore[K],
): Promise<ContentStore[K]> {
  const store = await readStore();
  store[key] = value;
  await writeStore(store);
  return value;
}
