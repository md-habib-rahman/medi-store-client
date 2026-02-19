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

export interface Session {
	id: string
	userId: string
	token: string
	ipAddress: string | null
	userAgent: string | null
	expiresAt: string
	createdAt: string
	updatedAt: string
}

export interface AuthUser {
	id: string
	name: string
	email: string
	emailVerified: boolean
	image: string | null
	role: "ADMIN" | "SELLER" | "CUSTOMER"
	status: "ACTIVE" | "INACTIVE"
	phone: string | null
	address: string | null
	createdAt: string
	updatedAt: string
}


export interface TokenParams {
	token: string
}