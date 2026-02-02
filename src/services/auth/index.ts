"use server";

import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"
import { jwtDecode } from 'jwt-decode'
import {headers} from 'next/headers'

export const loginUser = async (userData: FieldValues) => {
	try {
		console.log(userData)
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/sign-in/email`, {
			method: "POST",
			headers: {
				'content-type': 'application/json',
				'Origin': "http://localhost:3000"
			},
			credentials: "include",
			body: JSON.stringify(userData)
		})
		const result = await res.json()
		// console.log(result.headers)
		// const cky = await cookies();
		// if (result.user) {
		// 	cky.set("token", result.token)
		// }

		return result
	} catch (err: unknown) {
		if (err instanceof Error)
			return Error(err.message)

	}

}

// export const getUser = async () => {
// 	const storedToken = await cookies();
// 	const token = storedToken.get('token')?.value;
// 	let decodedData = null
// 	if (token) {
// 		decodedData = await jwtDecode(token)
// 		return decodedData
// 	} else {
// 		return null
// 	}
// }