import { db } from '$lib/db';
import { VaultData } from 'svelte/store';
import { decryptEntry } from '$lib/crypto-field.js';

// ms pasword 
import { masterPassword } from '$lib/stores';

let mp;
masterPassword.subscribe(val => mp = val);

export const VaultData = writable([]);

export async function SaveToIndexedDB(entry) {
  await db.vault.add(entry);
  await LoadFromIndexedDB();
}

export async function LoadFromIndexedDB() {
  const raw = await db.vault.toArray();

  const decryptedData = await Promise.all(
    raw.map(entry => decryptEntry(entry, mp))
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
