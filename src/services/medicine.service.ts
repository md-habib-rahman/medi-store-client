import { env } from "process";
import { ServiceOptions } from "./category.service";
import { cookies } from "next/headers";
import { MedicinePayload } from "@/types/medicine.types";

const API_URL = env.NEXT_PUBLIC_BASE_API;

export interface GetMedicinePrams {
	page?: string;
	limit?: number;
	sellerId?: string;
	categoryId?: string;
	sortBy?: string;
	sortOrder?: string;
	id?: string;
	manufacturer?: string;
	maxprice?: string
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

	createMedicine: async function (medData: MedicinePayload) {
		try {
			const cookieStore = await cookies()

			const res = await fetch(`${API_URL}/seller/medicines`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Cookie: cookieStore.toString(),
				},
				credentials: "include",
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
				...config.next, tags: ["medicines"]
			}

			console.log(url.toString())

			const res = await fetch(url.toString(), config)

			const data = await res.json()
			return data
		} catch (err) {
			return { data: null, error: { error: err, message: "something went wrong!" } }
		}
	},

	getSellerMedicine: async function (params?: GetMedicinePrams, options?: ServiceOptions) {
		try {
			const sellerId = params?.sellerId
			const url = new URL(`${API_URL}/seller/${sellerId}/all-medicine`)

			delete params?.sellerId

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
				...config.next, tags: ["medicines"]
			}

			console.log(url.toString())

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
	},

	deleteMedicine: async function (id: string) {
		try {
			const cookieStore = await cookies()

			const res = await fetch(`${API_URL}/seller/medicines/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Cookie: cookieStore.toString(),
				},
				credentials: "include",

			})

			const data = await res.json()

			if (!data.success) {
				return {
					data: null,
					error: { message: "Error: Deleting Medicne Failed" },
				}
			}
			return { data: data, error: null }

		} catch (err) {
			return { data: null, error: { message: "something went wrong!" } }
		}

	},

	updateMedicine: async function (id: string, payload: MedicinePayload) {
		try {
			const cookieStore = await cookies()

			const res = await fetch(`${API_URL}/seller/medicines/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Cookie: cookieStore.toString(),
				},
				credentials: "include",
				body: JSON.stringify(payload)
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

	updateMedicineStock: async function (id: string, quantity: number) {
		try {
			const cookieStore = await cookies()

			const res = await fetch(`${API_URL}/seller/medicines/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Cookie: cookieStore.toString(),
				},
				credentials: "include",
				body: JSON.stringify({ quantity })
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




}