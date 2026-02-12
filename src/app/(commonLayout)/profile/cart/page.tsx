"use client";

import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getCart } from "@/services/cart.service";

type CartItem = {
  medicineId: string;
  title: string;
  price: number;
  quantity: number;
  sellerId: string;
  thumbnail: string;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (!cart.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mt-2">Add medicines to continue shopping</p>
        <Button className="mt-4 bg-[#2F91CC] hover:bg-[#257bb0]">
          Browse Medicines
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Cart Items */}
      <div className="lg:col-span-8 space-y-4">
        <h1 className="text-2xl font-semibold text-gray-900">Shopping Cart</h1>

        {cart.map((item) => (
          <div
            key={item.medicineId}
            className="flex gap-4 border rounded-lg p-4 bg-white shadow-sm"
          >
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={80}
              height={80}
              className="rounded-md object-cover"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-500">
                Seller ID: {item.sellerId}
              </p>

              <div className="flex items-center justify-between mt-3">
                {/* Quantity Control */}
                <div className="flex items-center gap-2 border rounded-md px-2 py-1">
                  <Button>
                    <Minus size={16} />
                  </Button>
                  <span className="px-2">{item.quantity}</span>
                  <Button>
                    <Plus size={16} />
                  </Button>
                </div>

                {/* Price */}
                <div className="font-semibold text-gray-800">
                  ৳ {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>

            {/* Remove */}
            <Button className="text-red-500 hover:text-red-600">
              <Trash2 size={18} />
            </Button>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-4">
        <div className="sticky top-24 border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Order Summary
          </h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-600">Free</span>
            </div>
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>৳ {subtotal.toFixed(2)}</span>
          </div>

          <Button className="w-full mt-6 bg-[#FA941E] hover:bg-[#e48418] text-white">
            Proceed to Checkout
          </Button>

          <Button
            variant="outline"
            className="w-full mt-3 border-[#2F91CC] text-[#2F91CC]"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
