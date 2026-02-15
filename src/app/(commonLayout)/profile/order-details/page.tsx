'use server'
import { getOrders } from "@/actions/action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PaginationControls from "@/components/ui/pagination-controls";
import { formatDate } from "@/constants/formatDate";
import { Calendar, Search } from "lucide-react";
import Link from "next/link";
import OrdersClient from "./OrdersClient";

// const orders = [
//   {
//     id: "#ORD-2024-001",
//     date: "2024-01-20",
//     status: "Delivered",
//     total: "$249.99",
//     items: 3,
//     image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
//     products: ["Wireless Headphones", "Phone Case", "USB Cable"],
//   },
//   {
//     id: "#ORD-2024-002",
//     date: "2024-01-18",
//     status: "Processing",
//     total: "$89.50",
//     items: 1,
//     image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
//     products: ["Smart Watch"],
//   },
//   {
//     id: "#ORD-2024-003",
//     date: "2024-01-15",
//     status: "Shipped",
//     total: "$159.99",
//     items: 2,
//     image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
//     products: ["Sunglasses", "Wallet"],
//   },
//   {
//     id: "#ORD-2024-004",
//     date: "2024-01-10",
//     status: "Cancelled",
//     total: "$45.00",
//     items: 1,
//     image: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=400",
//     products: ["Book"],
//   },
// ];

export const getStatusColor = (status: string) => {
  switch (status) {
    case "DELIVERED":
      return "bg-green-100 text-green-800";
    case "RECEIVED":
      return "bg-blue-100 text-blue-800";
    case "SHIPPED":
      return "bg-purple-100 text-purple-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    case "PENDING":
      return "bg-[#FA941E]/20 text-[#FA941E]";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

async function OrderDetails({
  searchParams,
}: {
  searchParams: {
    page?: string;
    customerId?: string;
    sellerId?: string;
    orderId?: string;
  };
}) {
  const { page, customerId, sellerId, orderId } = await searchParams;
  const { data } = await getOrders({
    page,
    limit: 5,
    customerId,
    sellerId,
    orderId,
  });

  const orders = data.data;

  const pagination = data?.meta || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };

  //   console.log(data);
  return (
   <OrdersClient orders={orders} pagination={pagination}/>
  );
}

export default OrderDetails;
