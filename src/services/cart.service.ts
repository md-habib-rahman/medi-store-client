import { MedicineCardType } from "@/types/medicine.types";

export const setCart = (cart: CartItem[]) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("rumedi_cart", JSON.stringify(cart));
	}

};

export const getCart = (): CartItem[] => {
	if (typeof window === "undefined") return [];
	return JSON.parse(localStorage.getItem('rumedi_cart') || "[]");
};

export const addToCart = (item: CartItem): void => {
	const cart = getCart();

	const existing = cart.find(c => c.medicineId === item.medicineId);

	if (existing) {
		existing.quantity += item.quantity;
	} else {
		cart.push(item);
	}
	setCart(cart);
};

export const removeFromCart = (medicineId: string) => {
	const cart = getCart().filter(c => c.medicineId !== medicineId);
	setCart(cart);
};

export const clearCart = () => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("rumedi_cart");
	}
};
