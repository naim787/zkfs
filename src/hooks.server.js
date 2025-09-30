import { authenticator } from 'otplib';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const secret = 
	const token = authenticator.generate(secret);
	// Log URL yang diakses
	console.log('📥 Request masuk:', event.request.method, event.url.pathname);

	// Kamu juga bisa akses cookies, headers, dll
	const userAgent = event.request.headers.get('user-agent');
	console.log('🧠 User-Agent:', userAgent);

	// Lanjutkan ke route handler
	const response = await resolve(event);

	// Tambahkan custom header ke response
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
