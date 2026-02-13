import { OrderPayload } from "@/types/order.typs";
import { cookies } from "next/headers"
import { env } from "process";
import { ServiceOptions } from "./category.service";

const API_URL = env.NEXT_PUBLIC_BASE_API;

export interface GetOrdersParams {
	page?: string;
	limit?: number;
	sellerId?: string;
	customerId?: string;
	orderId?: string;
	sortBy?: string;
	sortOrder?: string;
	OrderId?: string;
}


export const orderService = {
	postOrders: async function (payload: OrderPayload) {
		try {

			// console.log(payload)
			const cookieStore = await cookies()

			const res = await fetch(`${API_URL}/orders`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Cookie: cookieStore.toString(),
				},

				body: JSON.stringify(payload)
			})

			const data = await res.json()

			if (data.error) {
				return {
					data: null,
					error: { message: "Error: Medicine creation Failed" },
				}
			}
			return { success: true, data: data, error: null }

		} catch (err) {
			return { data: null, error: { message: "something went wrong!" } }
		}
	},

	getOrders: async function (params?: GetOrdersParams, options?: ServiceOptions) {
		try {
			const cookieStore = await cookies()
			const url = new URL(`${API_URL}/orders`)

			if (params) {
				Object.entries(params).forEach(([key, value]) => {
					if (value !== undefined && value !== null && value !== "") {
						url.searchParams.append(key, value)
					}
				})
			}

			const config: RequestInit & { next?: any } = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Cookie: cookieStore.toString(),
				},
			};

			if (options?.cache) {
				config.cache = options.cache
			}

			if (options?.revalidate) {
				config.next = { revalidate: options.revalidate }
			}

			config.next = {
				...config.next, tags: ["orders"]
			}

			// console.log(url.toString())

			const res = await fetch(url.toString(), config)

			const data = await res.json()
			console.log(data)
			return data
		} catch (err) {
			return { data: null, error: { error: err, message: "something went wrong!" } }
		}
	}
}