import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_BASE_API!,
	// baseURL: "http://localhost:5000/api/auth",
	fetchOptions: {

		credentials: "include"
	},
})



