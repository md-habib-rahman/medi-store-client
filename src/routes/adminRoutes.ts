import { Route } from "@/types/routes.types";
import { ChartBarStacked, LogOut, Pill, ShoppingBag, UserRoundCog } from "lucide-react";

export const adminRoutes: Route[] = [{
	title: "Admin Routes",
	items: [
		{
			title: "Manage Categories",
			url: '/dashboard/add-categories',
			icon: ChartBarStacked
		},
		{
			title: "User Management",
			url: '/dashboard/manage-users',
			icon: UserRoundCog
		},
		{
			title: "View Orders",
			url: '/dashboard/view-orders',
			icon: ShoppingBag
		},
		{
			title: "View All Medicines",
			url: '/dashboard/medicines',
			icon: Pill
		},
		{
			title: "Log Out",
			url: '/dashboard/log-out',
			icon: LogOut
		}
	]

}]