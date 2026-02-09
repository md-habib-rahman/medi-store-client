import { authClient } from "@/lib/auth-client";
import { getMedicine } from "@/actions/action";
import AddMedicineClient from "./AddMedicineClient";
import { getSession } from "@/services/user.service";

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const { page } = await searchParams;

  const userData = await getSession();
  const sellerId = userData?.data?.user?.id;

  const { data } = await getMedicine({ page, sellerId });

  const pagination = data?.meta || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };

  return <AddMedicineClient data={data} pagination={pagination} />;
}
