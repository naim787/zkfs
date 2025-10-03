import { db } from '$lib/db';
import { writable } from 'svelte/store';

export const VaultData = writable([]);

export async function SaveToIndexedDB(entry) {
  await db.vault.add(entry);
  await LoadFromIndexedDB();
}

export async function LoadFromIndexedDB() {
  const raw = await db.vault.toArray();

  const decryptedData = await Promise.all(
    raw.map(entry => decryptEntry(entry, masterPassword))
  );

  VaultData.set(decryptedData);
}

// export async function LoadFromIndexedDB() {
//   const result = await db.vault.toArray();
//   VaultData.set(result);
// }

export async function DeleteFromIndexedDB(id) {
  await db.vault.delete(id);
  await LoadFromIndexedDB();
}
