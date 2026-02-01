"use server";

import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"

export const loginUser = async (userData) => {
	try {
		console.log(userData)
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/sign-in/email`, {
			method: "POST",
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(userData)
		})
		const result = await res.json()
		console.log(result)
		const cky = await cookies();
		if (result.user) {
			cky.set("token", result.token)
		}

		return result
	} catch (err: unknown) {
		if (err instanceof Error)
			return Error(err.message)

	}

}