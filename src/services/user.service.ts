"use server"
import { authClient } from "@/lib/auth-client"
import { LoginPayload } from "@/types/login.types"
import { updateUserInfoPayload, userImagePayload, userRolePayload, userStatusPayload } from "@/types/user.types"
import { cookies, headers } from "next/headers"


const API_URL = process.env.NEXT_PUBLIC_BASE_API

interface UserParams {
	page?: string;

}


export const getSession = async () => {
	try {
		const cookieStore = await cookies()
		const res = await fetch(`${API_URL}/auth/get-session`, {
			headers: {
				Cookie: cookieStore.toString()
			},
			cache: "no-store"
		})

		// console.log(cookieStore)

		// const { data: session } = await authClient.getSession()

		const session = await res.json()
		// console.log(session)

		console.log(session)
		return { data: session, error: null }

	} catch (err) {
		console.error(err)
		return {
			data: null, error: { message: "Something went wrong!" }
		}
	}
}

export const getAllUsers = async (params?: UserParams) => {
	try {
		console.log(params)
		const cookieStore = await cookies()

		const url = new URL(`${API_URL}/admin/users`)

		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				if (value !== undefined && value !== null && value !== "") {
					url.searchParams.append(key, value)
				}
			})
		}
		const res = await fetch(url.toString(), {
			headers: {
				"Content-type": "application/json",
				Cookie: cookieStore.toString()
			},
			cache: "no-store"
		})

		const { data } = await res.json()

		return { data: data, error: null }

	} catch (err) {
		return { data: null, error: { message: "something went wrong!" } }
	}
}

export const getSellerInfo = async (sellerId: string) => {
	try {
		// console.log(`${API_URL}/seller/:${sellerId}`)
		const res = await fetch(`${API_URL}/seller/${sellerId}`)
		const result = await res.json()
		// console.log(result)
		return result


	} catch (err) {
		return { data: null, error: { message: "something went wrong!" } }
	}
}

export const updateUserStatus = async (id: string, payload: userStatusPayload) => {
	try {
		console.log(JSON.stringify(payload))
		const cookieStore = await cookies()

		const res = await fetch(`${API_URL}/admin/users/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieStore.toString()
			},
			cache: "no-store",
			body: JSON.stringify(payload)
		})
		const data = await res.json()
		console.log(data)
		// if (!success) {
		// 	return {
		// 		data: null, error: { message: "Something went wrong!" }
		// 	}
		// }
		return { success: true, error: null }

	} catch (err) {
		console.error(err)
		return {
			data: null, error: { message: "Something went wrong!" }
		}
	}
}

export const updateUserRole = async (id: string, payload: userRolePayload) => {
	try {
		console.log(JSON.stringify(payload))
		const cookieStore = await cookies()

		const res = await fetch(`${API_URL}/admin/users/role/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieStore.toString()
			},
			cache: "no-store",
			body: JSON.stringify(payload)
		})
		const data = await res.json()
		// console.log(data)
		// if (!success) {
		// 	return {
		// 		data: null, error: { message: "Something went wrong!" }
		// 	}
		// }
		return { success: true, error: null }

	} catch (err) {
		console.error(err)
		return {
			data: null, error: { message: "Something went wrong!" }
		}
	}
}

export const updateUserImage = async (id: string, payload: userImagePayload) => {
	try {

		const cookieStore = await cookies()

		const res = await fetch(`${API_URL}/user/updateImage/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieStore.toString()
			},
			cache: "no-store",
			body: JSON.stringify(payload)
		})
		const data = await res.json()
		console.log(data)
		// if (!success) {
		// 	return {
		// 		data: null, error: { message: "Something went wrong!" }
		// 	}
		// }
		return { success: true, error: null }

	} catch (err) {
		console.error(err)
		return {
			data: null, error: { message: "Something went wrong!" }
		}
	}
}

export const updateUserInfo = async (id: string, payload: updateUserInfoPayload) => {
	try {
		const cookieStore = await cookies()

		const res = await fetch(`${API_URL}/user/updateUser/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieStore.toString()
			},
			cache: "no-store",
			body: JSON.stringify(payload)
		})
		const data = await res.json()
		// console.log(data)
		// if (!success) {
		// 	return {
		// 		data: null, error: { message: "Something went wrong!" }
		// 	}
		// }
		return { success: true, error: null }

	} catch (err) {
		console.error(err)
		return {
			data: null, error: { message: "Something went wrong!" }
		}
	}
}

export const logIn = async (data: LoginPayload) => {
	try {
		const res = await fetch(`${API_URL}/auth/sign-in/email`, {
			method: "POST",

			headers: {
				"Content-Type": "application/json",
				"X-Requested-With": "XMLHttpRequest",
			},
			body: JSON.stringify(data),
			credentials: "include",
		})

		// const result = await authClient.signIn.email(headers: await headers())
		const result = await res.json()

		console.log(result)
		return { success: true, data: result, error: null }

	} catch (err: any) {
		console.error("Sign-in error:", err);
		return null;
	}

}

export const getCurrentUserService = async () => {
	// const cookieStore = await cookies()

	// const res = await fetch(`${API_URL}/auth/get-session`, {
	// 	headers: {
	// 		Cookie: cookieStore.toString()
	// 	},
	// 	cache: "no-store"
	// })

	const res = await authClient.accountInfo()
	console.log(res)
	return res
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