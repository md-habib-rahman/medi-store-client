"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Search } from "lucide-react";
import { getStatusColor } from "./page";
import { formatDate } from "@/constants/formatDate";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PaginationControls from "@/components/ui/pagination-controls";
import { useState } from "react";
import { ReviewDialog } from "@/components/modules/orders/ReviewDialog";

export default function OrdersClient({ orders, pagination }) {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  //   console.log(open);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Order Details
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          View and track all your orders
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search orders..."
            className="pl-10 w-full"
          />
        </div>
      </div>

      {/* Orders */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row lg:items-start justify-between gap-4">
              {/* Left section */}
              <div className="flex gap-4">
                <img
                  src={order.items[0].medicine.thumbnail}
                  alt="Product"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover flex-shrink-0"
                />

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate max-w-[220px] sm:max-w-none">
                      {order.id}
                    </h3>
                    <Badge className={getStatusColor(order.orderStatus)}>
                      {order.orderStatus}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-600 gap-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(order.createdAt)}
                    </div>
                    <span>{order.items.length} items</span>
                  </div>

                  <div className="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-2">
                    {order.items.map((item) => (
                      <span key={item.medicine.id}>
                        {item.medicine.title},{" "}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right section */}
              <div className="flex flex-col items-center items-end justify-between lg:justify-start gap-3 lg:w-auto">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">
                  ${order.totalPrice}
                </div>

                {order.orderStatus === "DELIVERED" && (
                  <Button
                    variant={"rumedi_primary"}
                    onClick={() => {
                      setOpen(true);
                      setSelectedOrder(order.id);
                    }}
                  >
                    Add Review
                  </Button>
                )}
                <Link
                  href={`/profile/order-details/${order.id}`}
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant={"rumedi_secondary_outline"}
                    className="w-full sm:w-auto"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <PaginationControls meta={pagination} />
      </div>
      {open && (
        <ReviewDialog
          open={open}
          setOpen={setOpen}
          order={selectedOrder}
          setOrder={setSelectedOrder}
        />
      )}
    </div>
  );
}
