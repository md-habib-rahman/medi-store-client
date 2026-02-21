"use client";
import React from "react";
import { Home, Package, LogOut, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
  userRole?: "CUSTOMER" | "ADMIN" | "SELLER";
}

export default function ProfileLayoutClient({ children, userRole }: Props) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    {
      id: "account",
      icon: Home,
      label: "Account Information",
      url: "/profile/account-information",
      roles: ["CUSTOMER", "ADMIN", "SELLER"],
    },
    {
      id: "cart",
      icon: ShoppingCart,
      label: "Cart",
      url: "/profile/cart",
      roles: ["CUSTOMER"],
    },
    {
      id: "orders",
      icon: Package,
      label: "Order Details",
      url: "/profile/order-details",
      roles: ["CUSTOMER"],
    },
    {
      id: "logout",
      icon: LogOut,
      label: "Logout",
      url: "/profile/log-out",
      roles: ["CUSTOMER", "ADMIN", "SELLER"],
    },
  ];

  const newMenu = menuItems.filter((item) =>
    userRole ? item.roles.includes(userRole) : false,
  );

  //   console.log(newMenu);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Home className="w-4 h-4 mr-2 text-[#FA941E]" />
            <span>Profile</span>
            <span className="mx-2 text-[#FA941E]">›</span>
            <span className="text-gray-900 capitalize">
              {menuItems.find((item) => item.url === pathname)?.label ||
                "Account information"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-1">
                {newMenu.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.url}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive(item.url)
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3 text-[#FA941E]" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
