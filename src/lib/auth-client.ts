import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	// baseURL: process.env.NEXT_PUBLIC_BASE_API!,
	baseURL: "https://medi-store-backend-rust.vercel.app/api/auth",
	// baseURL: "https://rumedi-server.mdhabib.me/api/auth",
	fetchOptions: {

		credentials: "include"
	},
})



