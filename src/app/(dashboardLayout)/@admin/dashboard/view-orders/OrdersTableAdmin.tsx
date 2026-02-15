"use client";
import { getStatusColor } from "@/app/(commonLayout)/profile/order-details/page";
import { Badge } from "@/components/ui/badge";
import PaginationControls from "@/components/ui/pagination-controls";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PencilIcon } from "lucide-react";
import { formatDate } from "@/constants/formatDate";

const OrdersTableAdmin = ({ orders, meta }) => {
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">SN</TableHead>
              <TableHead className="w-25">Order No</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Shipping Address</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Customer Review</TableHead>
              <TableHead>Status</TableHead>

              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order.id}>
                <TableCell>
                  {(meta.page - 1) * meta.limit + index + 1}
                </TableCell>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>{order.shippingAddress}</TableCell>
                <TableCell>
                  {order.items.map((item, index) => (
                    <p key={`${item.medicine?.id}`}>
                      {index + 1}. {item.medicine?.title}, {item.quantity} pcs
                    </p>
                  ))}
                </TableCell>
                <TableCell>{order?.review?.comment}</TableCell>
                <TableCell>
                  {" "}
                  <Badge className={getStatusColor(order.orderStatus)}>
                    {order.orderStatus}
                  </Badge>
                </TableCell>               
                <TableCell className="text-right">{order.totalPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationControls meta={meta} />
    </div>
  );
};

export default OrdersTableAdmin;
