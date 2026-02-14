import { getOrders } from "@/actions/action";
import OrdersTable from "./ordersTable";

export default async function ManageOrdersSeller({
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



  return (
    <div>
      <OrdersTable
        orders={orders}
        meta={pagination}
       
      />
    </div>
  );
}
