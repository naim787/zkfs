import { json } from "@sveltejs/kit";
import { EncDat, DesDat } from "$lib/utils/c";

/** @type {import('./$types').RequestHandler} */
export async function POST(event) {
  // Ambil body dari request
  const body = await event.request.json();

  const { data } = body;

   if (!data) {
    return json({ error: "Data dan password harus diisi." }, { status: 400 });
  }

    // Enkripsi data
  const encrypted = EncDat(JSON.stringify(data), "123");

  let hasil = DesDat(encrypted, "123")

  console.log("Hasil decrypted string:", hasil.toString('utf8'));

  return json({
    encrypted
  });
}