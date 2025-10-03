import Dexie from 'dexie';

export const db = new Dexie('VaultDB');

db.version(1).stores({
  vault: '++id, title, email, password, note, url' // kamu bisa index title/email nanti
});