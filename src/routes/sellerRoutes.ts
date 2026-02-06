import { Route } from "@/types/routes.types";

export const sellerRoutes: Route[] = [{
	title: "Seller Routes",
	items: [
		{
			title: "Add Medicine",
			url: '/dashboard/add-medicine'
		}, {
			title: "Order Management",
			url: '/dashboard/manage-orders'
		}
	]

}]