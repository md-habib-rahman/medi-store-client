"use client";
import { getStatusColor } from "@/app/(commonLayout)/profile/order-details/page";
import { Badge } from "@/components/ui/badge";
import PaginationControls from "@/components/ui/pagination-controls";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
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
import { updateOrderStatus } from "@/actions/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formatDate } from "@/constants/formatDate";

// const invoices = [
//   {
//     invoice: "INV001",
//     paymentStatus: "Paid",
//     totalAmount: "$250.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV002",
//     paymentStatus: "Pending",
//     totalAmount: "$150.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV003",
//     paymentStatus: "Unpaid",
//     totalAmount: "$350.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV004",
//     paymentStatus: "Paid",
//     totalAmount: "$450.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV005",
//     paymentStatus: "Paid",
//     totalAmount: "$550.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV006",
//     paymentStatus: "Pending",
//     totalAmount: "$200.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV007",
//     paymentStatus: "Unpaid",
//     totalAmount: "$300.00",
//     paymentMethod: "Credit Card",
//   },
// ];

const OrderStatus = [
  { id: 1, content: "PENDING" },
  { id: 2, content: "RECEIVED" },
  { id: 3, content: "SHIPPED" },
  { id: 4, content: "DELIVERED" },
];
const OrdersTable = ({ orders, meta }) => {
  const router = useRouter();
  const handleStatusChange = async (id: string, orderStatus: string) => {
    try {
      // console.log({ id, orderStatus });
      const statusPayload = {
        orderStatus,
      };
      // console.log(statusPayload);
      const res = await updateOrderStatus(id, statusPayload);
      // console.log(res);
      if (res.success) {
        toast.success("order status updated!");
        router.refresh();
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
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
              <TableHead>Status</TableHead>
              <TableHead>Change Status</TableHead>

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
                    <p key={`${index}i`}>
                      {index + 1}. {item.medicine.title}, {item.quantity} pcs
                    </p>
                  ))}
                </TableCell>
                <TableCell>
                  {" "}
                  <Badge className={getStatusColor(order.orderStatus)}>
                    {order.orderStatus}
                  </Badge>
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <PencilIcon className="cursor-pointer"></PencilIcon>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {OrderStatus.map((item) => (
                        <DropdownMenuItem
                          key={`${item.id}`}
                          className="cursor-pointer"
                          onClick={() => {
                            handleStatusChange(order.id, item.content);
                          }}
                        >
                          {item.content}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
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

export default OrdersTable;
