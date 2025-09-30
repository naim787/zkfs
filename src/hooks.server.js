import { authenticator } from 'otplib';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const secret = import.meta.env.VITE_API_SECRET;
	const cleanSecret = secret.replace(/\s+/g, '').toUpperCase(); // jadi valid base32

	if (!secret) {
		console.error('❌ VITE_API_SECRET tidak ditemukan di .env!');
		throw new Error('VITE_API_SECRET is not set');
	}

	const token = authenticator.generate(cleanSecret);
	console.log("✅ Token OTP:", token);

	// Logging request
	console.log('📥 Request masuk:', event.request.method, event.url.pathname);
	console.log('🧠 User-Agent:', event.request.headers.get('user-agent'));

	const response = await resolve(event);

	response.headers.set('x-powered-by', 'SvelteKit');
	return response;
}



// import { authenticator } from 'otplib';

// // 1. Buat secret (biasanya disimpan di database atau environment variable)
// const secret = authenticator.generateSecret(); 
// console.log('Secret:', secret);

// // 2. Generate OTP dari secret
// const token = authenticator.generate(secret);
// console.log('Token:', token);

// // 3. Verifikasi OTP (contoh: dari input user)
// const isValid = authenticator.check(token, secret);
// console.log('Is Valid:', isValid);
