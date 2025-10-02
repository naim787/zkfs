import { json } from "@sveltejs/kit";

export async function POST({ request }) {
  const body = await request.json();

  const { data } = body;

  if (!data) {
    return json({ error: "Data tidak lengkap" }, { status: 400 });
  }

  console.log("data : ", data)

  return json({ status: "Vault terenkripsi berhasil disimpan" });
}