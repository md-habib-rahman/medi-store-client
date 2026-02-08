"use server"
import { authClient } from "@/lib/auth-client"
import { LoginPayload } from "@/types/login.types"
import { cookies, headers } from "next/headers"


const AUTH_API = process.env.NEXT_PUBLIC_BASE_API


export const getSession = async () => {
	try {

		const cookieStore = await cookies()

		const res = await fetch(`${AUTH_API}/auth/get-session`, {
			headers: {
				Cookie: cookieStore.toString()
			},
			cache: "no-store"
		})

		// const session = await authClient.getSession({
		// 	headers: await headers()
		// })

		const session = await res.json()
		console.log(session)
		return { data: session, error: null }

	} catch (err) {
		console.error(err)
		return {
			data: null, error: { message: "Something went wrong!" }
		}
	}
}



export const logIn = async (data: LoginPayload) => {
	try {
		// const res = await fetch(`${AUTH_API}/auth/sign-in/email`, {
		// 	method: "POST",

		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		"X-Requested-With": "XMLHttpRequest",
		// 	},
		// 	body: JSON.stringify(data),
		// 	credentials: "include",
		// })

		const res = await authClient.signIn.email(data)

		console.log(res)
		return { success: true, data: res.data, error: null }

	} catch (err: any) {
		console.error("Sign-in error:", err);
		return null;
	}

}

export const logOut = async () => {
	const res = await fetch(`${AUTH_API}/auth/sign-out`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-type": "application/json"
		}
	})


	console.log(res)
	return { success: true, error: null }

}