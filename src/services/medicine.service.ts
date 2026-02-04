import { env } from "process";

const API_URL = env.NEXT_PUBLIC_BASE_API;

interface GetMedicinePrams {
	page?: number;
	limit?: number;
	sellerId: string;
	categoryId: string;
	sortBy: string;
	sortOrder: string;
	id:string;
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
			const res = await fetch(url.toString(), { next: { revalidate: 60 } })

			const data = await res.json()
			return data
		} catch (err) {
			return { data: null, error: { error: err, message: "something went wrong!" } }
		}
	},

	getMedicineById: async function (id: string) {
		try {
			const res = await fetch((`${API_URL}/medicines?id=${id}`))

			const data = await res.json()

			return { data: data, error: null }

		} catch (err) {
			return { data: null, error: { message: "something went wrong!" } }
		}
	}
}