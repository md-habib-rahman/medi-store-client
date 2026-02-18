import { userRolePayload } from "./user.types"

export interface Seller {
	id: string
	name: string
	email: string
	emailVerified: boolean
	image: string | ""
	createdAt: string
	updatedAt: string
	status: "ACTIVE" | "INACTIVE"
	role: userRolePayload
	phone: string | null
	address: string | null
}

export interface SellerResponse {
	data: Seller
}