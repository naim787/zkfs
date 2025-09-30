/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	// Log URL yang diakses
	console.log('📥 Request masuk:', event.request.method, event.url.pathname);

	// Kamu juga bisa akses cookies, headers, dll
	const userAgent = event.request.headers.get('user-agent');
	console.log('🧠 User-Agent:', userAgent);

	// Lanjutkan ke route handler
	const response = await resolve(event);

	// Tambahkan custom header ke response
	response.headers.set('x-powered-by', 'SvelteKit ❤️');

	return response;
}
