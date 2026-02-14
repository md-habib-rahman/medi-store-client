import { getSingleOrder } from "@/actions/action";
import { OrderDetail } from "./OrderDetail";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await getSingleOrder(id);
  console.log(data);
  return (
    <div>
      <OrderDetail order={data} />
    </div>
  );
}
