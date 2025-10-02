import { json } from "@sveltejs/kit";
import { authenticator } from 'otplib';


export async function POST({ request }) {
  const body = await request.json();

  const { data } = body;

  if (!data) {
    return json({ error: "Data tidak lengkap" }, { status: 400 });
  }


    authenticator.options = {
        step: 30,
        digits: 6    // default Google Authenticator
    };

    // const secret = import.meta.env.VITE_API_SECRET;
    console.log('Secret used:', data);

    const token = authenticator.generate(data);
    console.log('Generated OTP:', token);

	// Logging request
	console.log('📥 Request masuk:', event.request.method, event.url.pathname);
	console.log('🧠 User-Agent:', event.request.headers.get('user-agent'));


  console.log("token autentikasi  : ", data)

  return json({ status: "Vault terenkripsi berhasil disimpan", token });
}