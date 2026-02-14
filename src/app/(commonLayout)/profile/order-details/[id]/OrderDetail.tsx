"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GetOrdersParams } from "@/services/order.service";
import { colorConstant } from "@/constants/color";
import { Order } from "@/types/order.typs";
import { formatDate } from "@/constants/formatDate";

export function OrderDetail({ order }: { order: Order }) {
  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Order Details</span>
            <Badge style={{ backgroundColor: colorConstant.primary }}>
              {order.orderStatus}
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground">Order ID</p>
              <p className="font-medium">{order.id}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Customer ID</p>
              <p className="font-medium">{order.customerId}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Seller ID</p>
              <p className="font-medium">{order.sellerId}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Shipping Address</p>
              <p className="font-medium">{order.shippingAddress}</p>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between">
            <span className="text-muted-foreground">Created At</span>
            <span>{formatDate(order.createdAt)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medicine</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="flex items-center gap-3">
                    <Image
                      src={item.medicine.thumbnail}
                      alt={item.medicine.title}
                      width={48}
                      height={48}
                      className="rounded-md border"
                    />
                    <span className="font-medium">{item.medicine.title}</span>
                  </TableCell>

                  <TableCell>${item.unitPrice}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${item.unitPrice * item.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Separator className="my-4" />

          <div className="flex justify-end gap-6 text-lg font-semibold">
            <span>Total</span>
            <span style={{ color: colorConstant.secondary }}>${order.totalPrice}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
