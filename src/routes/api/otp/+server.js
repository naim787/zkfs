import { json } from "@sveltejs/kit";
import { authenticator } from 'otplib';

export async function POST({ request }) {
  const body = await request.json();

  // Ambil token langsung dari body
  const token = body?.token;

  if (!token) {
    return json({ error: "Token tidak ada" }, { status: 400 });
  }

  // Opsi: generate OTP
  authenticator.options = {
    step: 30,
    digits: 6
  };

  const otp = authenticator.generate(token);
  console.log('🔐 Generated OTP:', otp);

  return json({ status: "OTP berhasil dibuat", otp });
}