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
	createdAt: Date;
	updatedAt: Date;
}
