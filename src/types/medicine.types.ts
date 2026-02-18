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

export type Medicine = {
	id?: string;
	title: string;
	generic: string;
	manufacturer: string;
	categoryId: string;
	price: number;
	availableQuantity: number;
	details: string;
	isAvailable: boolean;
	thumbnail?: string;
};

export interface MedicineData {
	data: MedicineCardType[]
}
export interface MedicineDataData {
	data: MedicineData
}


export interface CategoryResType {
	id: string,
	adminId: string,
	title: string,
	createdAt: string,
	updatedAt: string
}

export type ShopFilters = {
	categoryId?: string;
	manufacturer?: string;
	minPrice?: number;
	maxPrice?: number;
};


export interface MedicineCardProps {
	medicine: MedicineCardType;
}