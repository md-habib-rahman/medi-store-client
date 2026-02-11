import { error } from "console";
import { env } from "process"
import { success } from "zod";

const API_URL = env.NEXT_PUBLIC_BASE_API;

export const otherService = {
	getManufacturer: async () => {
		try {
			const result = await fetch(`${API_URL}/manufacturer`)
			const res = await result.json()
			if (!res.success) {
				return {
					success: false,
					error: "Something went wrong!"

				}				
			}
			return res

		} catch (err) {
			return { data: null, error: { error: err, message: "something went wrong!" } }
		}
	}
}