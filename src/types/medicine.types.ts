export interface MedicineCardType {
	id: string;
	categoryId: string;
	generic: string;
	sellerId: string;
	title: string;
	manufacturer: string;
	price: number;
	availableQuantity: number;
	details: string;
	isAvailable: boolean;
	thumbnail: string;
	createdAt: string;
	updatedAt: string;
	category: {
		title: string;
	};
	seller: {
		name: string;
	};
}

export interface CategoryResType {
	id: string,
	adminId: string,
	title: string,
	createdAt: string,
	updatedAt: string
}
