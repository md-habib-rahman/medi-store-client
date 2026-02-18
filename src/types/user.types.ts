export interface userStatusPayload {
	status: string
}

export interface userRolePayload {
	role: string
}

export interface userImagePayload {
	imageUrl: string
}

export interface updateUserInfoPayload {
	name: string;
	email?: string;
	phone: string;
	address: string;
	image: string;
}

export interface AllUser {
	id: string
	name: string
	email: string
	emailVerified: boolean
	image: string | ""
	createdAt: string
	updatedAt: string
	status: "ACTIVE" | "INACTIVE"
	role: "CUSTOMER" | "SELLER" | "ADMIN"
	phone: string | null
	address: string | null
}

