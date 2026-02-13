export interface OrderPayload {
	shippingAddress: string;
	deliveryFee: number;
	items: OrderItemArray[]
}

export interface OrderItemArray {

	medicineId: string;
	quantity: number;

}