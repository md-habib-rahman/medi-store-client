import { Route } from "@/types/routes.types";

export const adminRoutes: Route[] = [{
	title: "Admin Routes",
	items: [
		{
			title: "Add Categories",
			url: '/add-categories'
		}, {
			title: "User Management",
			url: '/manage-users'
		}
	]

}]