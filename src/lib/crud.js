import { db } from '$lib/db';

// Simpan satu item ke DB
async function saveToIndexedDB(entry) {
  await db.vault.add(entry);
  await loadFromIndexedDB();
}

// Load semua item dari DB
async function loadFromIndexedDB() {
  const result = await db.vault.toArray();
  data = result;
}

// Hapus item dari DB (kalau kamu mau fitur delete)
async function deleteFromIndexedDB(id) {
  await db.vault.delete(id);
  await loadFromIndexedDB();
}
