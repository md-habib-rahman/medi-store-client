"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import {
  LogOut,
  Menu,
  CircleX,
  LayoutDashboard,
  ShoppingCart,
  Ghost,
  Trash,
  X,
  ScanBarcode,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useState, useEffect } from "react";
import { getSession, logOut } from "@/services/user.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getCart, removeFromCart } from "@/services/cart.service";

export default function Navbar({ session, user }) {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (isMegaMenuOpen) {
        setIsMegaMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMegaMenuOpen]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemoveCartItem = (medicineId: string) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.medicineId !== medicineId);
      setCart(updated);
      return updated;
    });
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("rumedi_cart");
  };

  const handleLogout = async () => {
    try {
      const res = await authClient.signOut();
      console.log(res);
      if (res?.data?.success) {
        toast.success("Logged out successfully!");

        router.push("/");
        router.refresh();
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="border-b bg-secondary w-full sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <CircleX className="text-primary" size={20} />
              ) : (
                <Menu className="text-primary" size={20} />
              )}
            </button>

            <Link href="/" className="shrink-0">
              <div className="relative w-30 h-10 md:w-40 md:h-16">
                <Image
                  src="/rumedi_logo.png"
                  alt="rumedi Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 7rem, (max-width: 1024px) 10rem, 12rem"
                />
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-primary font-medium  ">
              Home
            </Link>

            <Link href="/shops" className="text-primary font-medium ">
              Shop
            </Link>
            <Link href="/dashboard" className="text-primary font-medium ">
              Dashboard
            </Link>

            <Link href="/about" className="text-primary font-medium ">
              About Us
            </Link>
          </div>

          {/* Right Side Navigation */}
          <nav className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {cart.length > 0 ? (
                  <Image
                    className="cursor-pointer"
                    width="30"
                    height="30"
                    src="https://img.icons8.com/fluency-systems-regular/48/buy--v2.png"
                    alt="items in cart"
                  />
                ) : (
                  <ShoppingCart className="cursor-pointer" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {cart.length === 0 ? (
                  <DropdownMenuItem>Nothing in the cart</DropdownMenuItem>
                ) : (
                  cart.map((item) => (
                    <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-default focus:bg-transparent">
                      {/* Thumbnail */}
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="h-12 w-12 rounded-md object-cover border"
                      />

                      {/* Content */}
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-tight line-clamp-2">
                          {item.title}
                        </p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>
                            {item.price} × {item.quantity}
                          </span>
                          <span className="font-semibold text-foreground">
                            {item.price * item.quantity}
                          </span>
                        </div>
                      </div>

                      {/* Remove button */}
                      <div
                        className="text-muted-foreground cursor-pointer hover:text-destructive transition"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveCartItem(item.medicineId);
                        }}
                      >
                        <X />
                      </div>
                    </DropdownMenuItem>
                  ))
                )}

                <DropdownMenuSeparator />
                {cart.length !== 0 && (
                  <>
                    <Link href="/profile/cart" className="cursor-pointer">
                      {" "}
                      <DropdownMenuItem className="text-[#2F91CC] cursor-pointer focus:bg-red-50">
                        <ScanBarcode />
                        Proceed to checkout
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-500 cursor-pointer focus:bg-red-50"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleClearCart();
                      }}
                    >
                      <Trash />
                      Clear Cart
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            {session ? (
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage
                        src={user?.image || undefined}
                        alt={user?.name || "User avatar"}
                        referrerPolicy="no-referrer"
						className="cursor-pointer"
                      />
                      <AvatarFallback className="text-2xl font-bold bg-indigo-500 text-white cursor-pointer">
                        X
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-[200px]">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/profile/account-information">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/profile/order-details">Order Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className=" cursor-pointer focus:bg-red-50">
                      <Link href={"/dashboard"} className="flex items-center">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-500 cursor-pointer focus:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div>
                <Link href="/login">
                  <Button variant={"rumedi_primary"}>Login</Button>
                </Link>{" "}
                <Link href="/register">
                  <Button variant={"rumedi_secondary"}>Register</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
