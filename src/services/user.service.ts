import { cookies } from "next/headers"

const AUTH_API = process.env.NEXT_PUBLIC_BASE_API

export const userService = {
	getSession: async function () {
		try {

			const cookieStore = await cookies()

			const res = await fetch(`${AUTH_API}/auth/get-session`, {
				headers: {
					Cookie: cookieStore.toString()
				},
				cache: "no-store"
			})
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
}


