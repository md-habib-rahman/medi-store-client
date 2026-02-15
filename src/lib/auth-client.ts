import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL:"https://medi-store-backend-rust.vercel.app",
	fetchOptions: {
		credentials: "include"
	},
})



