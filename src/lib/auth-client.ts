import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	// baseURL: process.env.NEXT_PUBLIC_BASE_API!,
	// baseURL: typeof window !== "undefined" ? window.location.origin : "",
	// baseURL: "https://rumedi-server.mdhabib.me/api/auth",
	fetchOptions: {

		credentials: "include"
	},
})



