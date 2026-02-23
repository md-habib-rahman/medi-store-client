"use client";

import Image from "next/image";
import { Trash2, Plus, Minus, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useMemo, use } from "react";
import { getCart, removeFromCart } from "@/services/cart.service";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { getSession } from "@/services/user.service";
import { OrderItemArray, OrderPayload } from "@/types/order.typs";
import { orderService } from "@/services/order.service";
import { postOrders } from "@/actions/action";
import { toast } from "sonner";
import Link from "next/link";

type CartItem = {
  medicineId: string;
  title: string;
  price: number;
  quantity: number;
  sellerId: string;
  thumbnail: string;
};

type NewItem = {
  medicineId: string;
  newQuantity: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<NewItem[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState<string | null>(null);
  //   console.log(deliveryAddress);

  useEffect(() => {
    const data = getCart();
    setCart(data);

    if (data.length > 0) {
      setSelectedSeller(data[0].sellerId);
    }
  }, []);

  const groupedCart = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        if (!acc[item.sellerId]) {
          acc[item.sellerId] = [];
        }
        acc[item.sellerId].push(item);
        return acc;
      },
      {} as Record<string, CartItem[]>,
    );
  }, [cart]);

  const handleCheckOut = async () => {
    try {
      const { data } = await getSession();
      const user = data.user;
      // console.log(cart);
      if (deliveryAddress) {
        user.address = deliveryAddress;
      }
      //   console.log(selectedSeller);
      const filterCartItem = cart.filter(
        (element) => selectedSeller === element.sellerId,
      );

      // console.log(orderItem);
      const orderItem: OrderItemArray[] = [];
      filterCartItem.map((filtered) => {
        orderItem.push({
          medicineId: filtered.medicineId,
          quantity: filtered.quantity,
        });
      });

      const payload: OrderPayload = {
        shippingAddress: user.address,
        deliveryFee: 50,
        items: orderItem,
      };

      const result = await postOrders(payload);
      if (result.success) {
        toast.success("Order Placed!");
        payload.items.map((item) => {
          removeFromCart(item.medicineId);
          setCart((prev) =>
            prev.filter((cartItem) => cartItem.medicineId !== item.medicineId),
          );
        });
        window.location.reload();
        setDeliveryAddress(null);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const selectedItems = selectedSeller ? groupedCart[selectedSeller] || [] : [];
  const subtotal = selectedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (!cart.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          Your cart is empty
        </h2>
        <Link href="/shops">
          <Button className="mt-4 bg-[#2F91CC]" variant={"rumedi_primary"}>
            Browse Medicines
          </Button>
        </Link>
      </div>
    );
  }

  const handleRemoveCartItem = (medicineId: string) => {
    removeFromCart(medicineId);
    setCart((prev) => prev.filter((item) => item.medicineId !== medicineId));
    // console.log(cart);
    toast.success("Item removed from cart");
    // console.log(medicineId);
  };

  function handlePlusChange(n: number, medicineId: string) {
    const newQuantity = n + 1;

    setNewItem((prev) => {
      const exists = prev.find((i) => i.medicineId === medicineId);

      if (exists) {
        return prev.map((i) =>
          i.medicineId === medicineId ? { ...i, newQuantity } : i,
        );
      }

      return [...prev, { medicineId, newQuantity }];
    });

    setCart((prev) =>
      prev.map((item) =>
        item.medicineId === medicineId
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  }
  function handleMinusChange(n: number, medicineId: string) {
    if (n <= 1) {
      toast.error("Item quantity can not be negetive");
      return;
    }
    const newQuantity = n - 1;

    setNewItem((prev) => {
      const exists = prev.find((i) => i.medicineId === medicineId);

      if (exists) {
        return prev.map((i) =>
          i.medicineId === medicineId ? { ...i, newQuantity } : i,
        );
      }

      return [...prev, { medicineId, newQuantity }];
    });

    setCart((prev) =>
      prev.map((item) =>
        item.medicineId === medicineId
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 space-y-8">
        <h1 className="text-2xl font-semibold text-gray-900">Shopping Cart</h1>

        {Object.entries(groupedCart).map(([sellerId, items]) => (
          <div
            key={sellerId}
            className={`border rounded-xl overflow-hidden transition-all ${
              selectedSeller === sellerId
                ? "ring-2 ring-[#2F91CC] bg-blue-50/30"
                : "bg-white"
            }`}
          >
            <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Store size={18} className="text-gray-600" />
                <span className="font-medium text-gray-700">
                  Seller: {sellerId}
                </span>
              </div>
              <Input
                type="radio"
                name="seller-select"
                checked={selectedSeller === sellerId}
                onChange={() => setSelectedSeller(sellerId)}
                className="w-5 h-5 accent-[#2F91CC] cursor-pointer"
              />
            </div>

            <div className="divide-y">
              {items.map((item) => (
                <div
                  key={item.medicineId}
                  className="flex gap-4 p-4 items-center"
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="rounded-md object-cover border"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.title}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant={"ghost"}
                          className="p-1 hover:bg-gray-100"
                          onClick={() =>
                            handleMinusChange(item.quantity, item.medicineId)
                          }
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <Button
                          variant={"ghost"}
                          className="p-1 hover:bg-gray-100"
                          onClick={() =>
                            handlePlusChange(item.quantity, item.medicineId)
                          }
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                      <span className="font-semibold text-[#2F91CC]">
                        $ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => handleRemoveCartItem(item.medicineId)}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="lg:col-span-4">
        <div className="sticky top-24 border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="p-3 bg-amber-50 rounded-md mb-4 border border-amber-100 text-xs text-amber-800">
            Note: You can only checkout items from one seller at a time.
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Selected Seller</span>
              <span className="font-medium block line-clamp-2 break-words">
                {selectedSeller || "None"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal ({selectedItems.length} items)</span>
              <span>$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="text-green-600 font-medium">$ 50</span>
            </div>

            <Badge variant={"rumedi_primary_badge"} className="text-xs">
              Delivery Method
            </Badge>

            <div className="flex justify-between">
              <span className="">Cash on Delivery</span>
              <Checkbox defaultChecked />
            </div>
          </div>

          <div className="border-y mt-4 py-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>$ {(subtotal + 50).toFixed(2)}</span>
          </div>
          <Label className="my-2">Delivery Address</Label>
          <Input onChange={(e) => setDeliveryAddress(e.target.value)}></Input>

          <Button
            disabled={!selectedSeller}
            className="w-full mt-6 bg-[#FA941E] hover:bg-[#e48418] text-white py-6 text-lg"
            onClick={handleCheckOut}
          >
            Checkout with Seller
          </Button>
        </div>
      </div>
    </div>
  );
}
