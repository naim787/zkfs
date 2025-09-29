export async function encryptVault(data, password) {
  const enc = new TextEncoder();

  // Gunakan window.crypto.getRandomValues
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  // Import password sebagai key material
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  // Derive key dengan PBKDF2
  const key = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );

  // Enkripsi data
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(JSON.stringify(data))
  );

  return {
    ciphertext: bufferToBase64(encrypted),
    salt: bufferToBase64(salt),
    iv: bufferToBase64(iv),
  };
}

export async function decryptVault(ciphertextB64, password, saltB64, ivB64) {
  const dec = new TextDecoder();
  const enc = new TextEncoder();

  // Decode base64 ke ArrayBuffer
  const salt = base64ToBuffer(saltB64);
  const iv = base64ToBuffer(ivB64);
  const ciphertext = base64ToBuffer(ciphertextB64);

  // Import key material dari password
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  // Derive key yang sama untuk dekripsi
  const key = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  // Dekripsi data
  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext
  );

  return dec.decode(decrypted);
}

// Helpers
function bufferToBase64(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function base64ToBuffer(b64) {
  const binary = atob(b64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}











// import crypto from 'crypto';

// export async function encryptVault(data, password) {
//   const enc = new TextEncoder();
//   const salt = crypto.getRandomValues(new Uint8Array(16));
//   const iv = crypto.getRandomValues(new Uint8Array(12));

//   const keyMaterial = await crypto.subtle.importKey(
//     "raw",
//     enc.encode(password),
//     "PBKDF2",
//     false,
//     ["deriveKey"]
//   );

//   const key = await crypto.subtle.deriveKey(
//     {
//       name: "PBKDF2",
//       salt,
//       iterations: 100000,
//       hash: "SHA-256",
//     },
//     keyMaterial,
//     { name: "AES-GCM", length: 256 },
//     false,
//     ["encrypt"]
//   );

//   const encrypted = await crypto.subtle.encrypt(
//     { name: "AES-GCM", iv },
//     key,
//     enc.encode(JSON.stringify(data))
//   );

//   return {
//     ciphertext: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
//     salt: btoa(String.fromCharCode(...salt)),
//     iv: btoa(String.fromCharCode(...iv))
//   };
// }

// export async function decryptVault(ciphertextB64, password, saltB64, ivB64) {
//   const dec = new TextDecoder();

//   const salt = Uint8Array.from(atob(saltB64), c => c.charCodeAt(0));
//   const iv = Uint8Array.from(atob(ivB64), c => c.charCodeAt(0));
//   const ciphertext = Uint8Array.from(atob(ciphertextB64), c => c.charCodeAt(0));

//   const enc = new TextEncoder();
//   const keyMaterial = await crypto.subtle.importKey(
//     "raw",
//     enc.encode(password),
//     "PBKDF2",
//     false,
//     ["deriveKey"]
//   );

//   const key = await crypto.subtle.deriveKey(
//     {
//       name: "PBKDF2",
//       salt,
//       iterations: 100000,
//       hash: "SHA-256",
//     },
//     keyMaterial,
//     { name: "AES-GCM", length: 256 },
//     false,
//     ["decrypt"]
//   );

//   const decrypted = await crypto.subtle.decrypt(
//     { name: "AES-GCM", iv },
//     key,
//     ciphertext
//   );

//   return dec.decode(decrypted);
// }
