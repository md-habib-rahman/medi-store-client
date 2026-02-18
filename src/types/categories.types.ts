
export interface Category {
	id: string;
	adminId: string;
	title: string;
	createdAt: string;
	updatedAt: string;
}

export interface CategoryResponse {
	data: Category[]
}
export interface CategoryResponseData {
	data: CategoryResponse
}
export interface CategoryResponseDataData {
	data: CategoryResponseData
}
