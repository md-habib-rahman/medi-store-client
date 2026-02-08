import { env } from "process";
import { ServiceOptions } from "./category.service";
import { cookies } from "next/headers";

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

export interface MedicineData {

	categoryId: string;
	generic: string;
	title: string;
	manufacturer: string;
	price: number;
	availableQuantity: number;
	details: string;
	isAvailable: boolean;
	thumbnail?: string;
}


export const MedicineService = {

	createMedicine: async function (medData: MedicineData) {
		try {
			const cookieStore = await cookies()

			const res = await fetch(`${API_URL}/seller/medicines`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Cookie: cookieStore.toString(),
				},

				body: JSON.stringify(medData)
			})

			const data = await res.json()

			if (data.error) {
				return {
					data: null,
					error: { message: "Error: Medicine creation Failed" },
				}
			}
			return { data: data, error: null }

		} catch (err) {
			return { data: null, error: { message: "something went wrong!" } }
		}
	},

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