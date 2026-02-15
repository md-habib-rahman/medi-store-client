import { createAuthClient } from "better-auth/react";
import { env } from "process";


export const authClient = createAuthClient({

	/** The base URL of the server (optional if you're using the same domain) */
	baseURL: "https://medi-store-backend-rust.vercel.app/",
	fetchOptions: {
		credentials: "include"
	}
})

