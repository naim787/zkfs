import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST(event) {
  // Ambil body dari request
  const body = await event.request.json();
  

  const { data } = body;

   if (!data) {
    return json({ error: "Data dan password harus diisi." }, { status: 400 });
  }

  return json({
    data
  });
}