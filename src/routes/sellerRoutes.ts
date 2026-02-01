import { Route } from "@/types/routes.types";

export const adminRoutes: Route[] = [{
	title: "Admin Routes",
	items: [
		{
			title: "Add Medicine",
			url: '/add-medicine'
		}, {
			title: "Order Management",
			url: '/manage-orders'
		}
	]

}]