import { db } from '$lib/db';

// Simpan satu item ke DB
export async function SaveToIndexedDB(entry) {
  await db.vault.add(entry);
  await loadFromIndexedDB();
}

// Load semua item dari DB
export async function LoadFromIndexedDB() {
  const result = await db.vault.toArray();
  data = result;
}

// Hapus item dari DB (kalau kamu mau fitur delete)
export async function DeleteFromIndexedDB(id) {
  await db.vault.delete(id);
  await loadFromIndexedDB();
}
