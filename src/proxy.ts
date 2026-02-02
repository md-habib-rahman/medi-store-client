import { NextRequest, NextResponse } from "next/server"
import { userService } from "./services/user.service"
import { Roles } from "./constants/roles";

export const proxy = async (req: NextRequest) => {

	const { pathname } = req.nextUrl

	let isAuthenticated = false;
	let isAdmin = false;
	let isSeller = false;
	let isCustomer = false;

	const { data } = await userService.getSession()
	const role = data?.user?.role;

	if (data.user) {
		isAuthenticated = true;

		isAdmin = role === Roles.admin;
		isSeller = role === Roles.seller;
		isCustomer = role === Roles.user;
	}
	if (!isAuthenticated) {
		return NextResponse.redirect(new URL('./login', req.url))
	}

	if (pathname.startsWith('/dashboard')) {
		if (!isAdmin && !isSeller) {
			return NextResponse.redirect(new URL('/login', req.url))
		}
	}

	// console.log({ role, isAdmin, isSeller, isCustomer })

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard']
}
