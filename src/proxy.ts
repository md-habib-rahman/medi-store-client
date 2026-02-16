import { NextRequest, NextResponse } from "next/server"

import { Roles } from "./constants/roles";
import { getSession } from "./services/user.service";


export const proxy = async (req: NextRequest) => {

	const { pathname } = req.nextUrl

	if (pathname.startsWith("/verify-email")) {
		return NextResponse.next();
	}

	const sessionToken = req.cookies.get("better-auth.session_token");

	let isAuthenticated = false;
	let isAdmin = false;
	let isSeller = false;
	let isCustomer = false;

	const { data } = await getSession()
	// console.log(data)
	const role = data?.user?.role;

	if (data?.user) {
		isAuthenticated = true;

		isAdmin = role === Roles.admin;
		isSeller = role === Roles.seller;
		isCustomer = role === Roles.user;
	}
	if (!isAuthenticated) {
		return NextResponse.redirect(new URL('/login', req.url))
	}

	if (pathname.startsWith('/dashboard')) {
		if (!isAdmin && !isSeller) {
			return NextResponse.redirect(new URL('/login', req.url))
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard', '/dashboard/:path*', '/profile', '/profile/:path*']
}
