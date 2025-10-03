import { db } from '$lib/db';

import { db } from '$lib/db';

export const VaultData = writable([]);

// Simpan satu item ke DB
export async function SaveToIndexedDB(entry) {
  await db.vault.add(entry);
  await LoadFromIndexedDB();
}

// Load semua item dari DB
export async function LoadFromIndexedDB() {
  const result = await db.vault.toArray();
   VaultData.set(result);
}

// Hapus item dari DB (kalau kamu mau fitur delete)
export async function DeleteFromIndexedDB(id) {
  await db.vault.delete(id);
  await LoadFromIndexedDB();
}
