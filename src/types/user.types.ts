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
