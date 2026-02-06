import { cookies } from "next/headers";
import { env } from "process";

const API_URL = env.NEXT_PUBLIC_BASE_API;

interface GetCategoryParams {

	id?: string;
	page?: string;
}

export interface ServiceOptions {
	cache?: RequestCache;
	revalidate?: number;
}

export interface catData {
	title: string;
}

export const categoryService = {

	getCategory: async (params?: GetCategoryParams, options?: ServiceOptions) => {
		try {
			const url = new URL(`${API_URL}/categories`)

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

	createCategory: async function (catData: catData) {
		try {
			const cookieStore = await cookies()

			const res = await fetch(`${API_URL}/categories`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Cookie: cookieStore.toString(),
				},
				body: JSON.stringify(catData)
			})

			const data = await res.json()

			if (data.error) {
				return {
					data: null,
					error: { message: "Error: Category creation Failed" },
				}
			}
			return { data: data, error: null }

		} catch (err) {
			return { data: null, error: { message: "something went wrong!" } }
		}
	},

	deleteCategory: async function (id: string) {
		try {
			const cookieStore = await cookies()

			const res = await fetch(`${API_URL}/categories/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Cookie: cookieStore.toString(),
				},

			})

			const data = await res.json()

			if (!data.success) {
				return {
					data: null,
					error: { message: "Error: Category creation Failed" },
				}
			}
			return { data: data, error: null }

		} catch (err) {
			return { data: null, error: { message: "something went wrong!" } }
		}

	}

	// createCategory: async function ()
}