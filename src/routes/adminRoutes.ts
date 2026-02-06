import { Route } from "@/types/routes.types";

export const adminRoutes: Route[] = [{
	title: "Admin Routes",
	items: [
		{
			title: "Add Categories",
			url: '/dashboard/add-categories'
		}, {
			title: "User Management",
			url: '/manage-users'
		}
	]

}]