export interface OrderPayload {
	shippingAddress: string;
	deliveryFee: number;
	items: OrderItemArray[]
}

export interface OrderItemArray {
	medicineId: string;
	quantity: number;
}

export interface Order {
	id: string;
	customerId: string;
	sellerId: string;
	orderStatus: string;
	shippingAddress: string;
	totalPrice: number;
	createdAt: string;
	updatedAt: string;
	items: OrderItem[];
}

export interface OrderItem {
	id: string;
	medicineId: string;
	quantity: number;
	unitPrice: number;
	medicine: Medicine;
}

export interface Medicine {
	id: string;
	title: string;
	thumbnail: string;
}