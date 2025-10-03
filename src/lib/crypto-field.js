// $lib/crypto-field.js
const enc = new TextEncoder();
const dec = new TextDecoder();

// Helper: ubah ArrayBuffer ke base64 dan sebaliknya
function bufferToBase64(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}
function base64ToBuffer(b64) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// Derive key dari password (PBKDF2)
async function deriveKey(password, salt) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

// Enkripsi teks tunggal
async function encryptText(text, key, iv) {
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(text)
  );
  return bufferToBase64(encrypted);
}

// Dekripsi teks tunggal
async function decryptText(ciphertextB64, key, iv) {
  const ciphertext = base64ToBuffer(ciphertextB64);
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext
  );
  return dec.decode(decrypted);
}

// 🔐 Enkripsi hanya value tiap field
export async function encryptEntry(entry, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);

  const encrypted = {};

  for (const [k, v] of Object.entries(entry)) {
    encrypted[k] = await encryptText(v, key, iv);
  }

  return {
    ...encrypted,
    salt: bufferToBase64(salt),
    iv: bufferToBase64(iv)
  };
}

// 🔓 Dekripsi tiap field
export async function decryptEntry(encryptedEntry, password) {
  const salt = base64ToBuffer(encryptedEntry.salt);
  const iv = base64ToBuffer(encryptedEntry.iv);
  const key = await deriveKey(password, salt);

  const decrypted = {};
  for (const [k, v] of Object.entries(encryptedEntry)) {
    if (k === 'salt' || k === 'iv') continue;
    decrypted[k] = await decryptText(v, key, iv);
  }

  return decrypted;
}
