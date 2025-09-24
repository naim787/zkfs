import { json } from "@sveltejs/kit";

let storedVault = null;

export async function POST({ request }) {
  const body = await request.json();

  const { ciphertext, salt, iv } = body;

  if (!ciphertext || !salt || !iv) {
    return json({ error: "Data tidak lengkap" }, { status: 400 });
  }

  storedVault = { ciphertext, salt, iv };

  return json({ status: "Vault terenkripsi berhasil disimpan" });
}

export async function GET() {
  if (!storedVault) return json({ error: "Tidak ada data" }, { status: 404 });
  return json(storedVault);
}
