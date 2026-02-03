import { env } from "process";
import { ur } from "zod/v4/locales";

const API_URL = env.NEXT_PUBLIC_BASE_API;

interface GetMedicinePrams {
	page?: number;
	limit?: number;
	sellerId: string;
	categoryId: string;
	sortBy: string;
	sortOrder: string;
}

export const MedicineService = {
	getMedicine: async function (params?: GetMedicinePrams) {
		try {
			const url = new URL(`${API_URL}/medicines`)

			if (params) {
				Object.entries(params).forEach(([key, value]) => {
					if (value !== undefined && value !== null && value !== "") {
						url.searchParams.append(key, value)
					}
				})
			}
			const res = await fetch(ur.toString(), { next: { revalidate: 60 } })

			const data = await res.json()
			return data
		} catch (err) {
			return { data: null, error: { error: err, message: "something went wrong!" } }
		}
	}
}