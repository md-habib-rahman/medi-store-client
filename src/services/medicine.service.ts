import { env } from "process";
import { ServiceOptions } from "./category.service";

const API_URL = env.NEXT_PUBLIC_BASE_API;

interface GetMedicinePrams {
	page?: number;
	limit?: number;
	sellerId: string;
	categoryId: string;
	sortBy: string;
	sortOrder: string;
	id: string;
}

export const MedicineService = {
	getMedicine: async function (params?: GetMedicinePrams, options?: ServiceOptions) {
		try {
			const url = new URL(`${API_URL}/medicines`)

			if (params) {
				Object.entries(params).forEach(([key, value]) => {
					if (value !== undefined && value !== null && value !== "") {
						url.searchParams.append(key, value)
					}
				})
			}

			const config: RequestInit = {}

			if (options?.cache) {
				config.cache = options.cache
			}

			if (options?.revalidate) {
				config.next = { revalidate: options.revalidate }
			}

			config.next = {
				...config.next, tags: ["categories"]
			}

			const res = await fetch(url.toString(), config)

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