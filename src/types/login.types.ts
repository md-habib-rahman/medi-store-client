export type LoginPayload = {
	email: string;
	password: string;
};


export type RegisterPalyload = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;

}

export interface userSessionResponse {
	name: string;
	email: string;
	emailVerified: boolean;
	image?: string;
	createdAt?: string;
	updatedAt?: string;
	role: string;
	status: string;
	id: string
}