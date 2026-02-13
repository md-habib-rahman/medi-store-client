import { getOrders } from "@/actions/action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PaginationControls from "@/components/ui/pagination-controls";
import { formatDate } from "@/constants/formatDate";
import { Calendar, Search } from "lucide-react";

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

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-800";
    case "Processing":
      return "bg-blue-100 text-blue-800";
    case "Shipped":
      return "bg-purple-100 text-purple-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
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

  console.log(data);
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Order Details</h1>
        <p className="text-sm text-gray-600 mt-1">
          View and track all your orders
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input type="text" placeholder="Search orders..." className="pl-10" />
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-4">
                <img
                  src={order.items[0].medicine.thumbnail}
                  alt="Product"
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                    <Badge className={getStatusColor(order.orderStatus)}>
                      {order.orderStatus}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(order.createdAt)}
                    </div>
                    <span>{order.items.length} items</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {order.items.map((item) => (
                      <span>{item.medicine.title}, </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  ${order.totalPrice}
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <PaginationControls meta={pagination} />
    </div>
  );
}

export default OrderDetails;
