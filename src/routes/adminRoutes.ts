import { Route } from "@/types/routes.types";

export const adminRoutes: Route[] = [{
	title: "Admin Routes",
	items: [
		{
			title: "Manage Categories",
			url: '/dashboard/add-categories'
		},
		{
			title: "User Management",
			url: '/dashboard/manage-users'
		},
		{
			title: "View Orders",
			url: '/dashboard/orders'
		},
		{
			title: "View All Medicines",
			url: '/dashboard/medicines'
		},
		{
			title: "Log Out",
			url: '/dashboard/log-out'
		}
	]

}]