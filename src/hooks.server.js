// import { authenticator } from 'otplib';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
// 	authenticator.options = {
// 	step: 30,
// 	digits: 6    // default Google Authenticator
// };

// const secret = import.meta.env.VITE_API_SECRET;
// console.log('Secret used:', secret);

// const token = authenticator.generate(secret);
// console.log('Generated OTP:', token);

	// Logging request
	// console.log('📥 Request masuk:', event.request.method, event.url.pathname);
	// console.log('🧠 User-Agent:', event.request.headers.get('user-agent'));

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
