export { default } from "next-auth/middleware";

export const config = {
	matcher: [
		"/dashboard/:path*",
		"/upload",
		"/settings/:path*",
		"/billing",
		"/api/(?!webhooks/stripe).*",
	],
};