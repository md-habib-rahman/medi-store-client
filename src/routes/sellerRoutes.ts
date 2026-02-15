import { Route } from "@/types/routes.types";
import { LogOut, Package, Pill } from "lucide-react";

export const sellerRoutes: Route[] = [{
	title: "Seller Routes",
	items: [
		{
			title: "Add Medicine",
			url: '/dashboard/add-medicine',
			icon: Pill
		}, {
			title: "Order Management",
			url: '/dashboard/manage-orders',
			icon: Package
		}, {
			title: "Log Out",
			url: '/dashboard/log-out',
			icon: LogOut
		}
	]

}]