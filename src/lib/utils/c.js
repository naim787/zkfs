import crypto from 'crypto';

export function EncDat(data, password) {
  const key = crypto.createHash('sha256').update(password).digest();

  const nonce = crypto.randomBytes(12);

  const buf = Buffer.isBuffer(data)
    ? data
    : Buffer.from(data); 

    
  const cipher = crypto.createCipheriv('aes-256-gcm', key, nonce);

  const encrypted = Buffer.concat([
    cipher.update(buf),
    cipher.final()
  ]);

  const authTag = cipher.getAuthTag();

  const fullData = Buffer.concat([nonce, encrypted, authTag]);

  return fullData.toString('hex');
}

export function DesDat(h, p) {
  const raw = Buffer.from(h, 'hex');

  const key = crypto.createHash('sha256').update(p).digest();

  const nonce = raw.slice(0, 12);
  const authTag = raw.slice(raw.length - 16);
  const ciphertext = raw.slice(12, raw.length - 16);

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, nonce);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final()
  ]);

  return decrypted;
}
