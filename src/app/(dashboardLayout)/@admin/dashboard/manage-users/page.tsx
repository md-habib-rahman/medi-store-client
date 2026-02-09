import { getAllUsers } from "@/services/user.service";
import UserTable from "./userTable";
import PaginationControls from "@/components/ui/pagination-controls";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data } = await getAllUsers({ page });
  //   console.log(data);
  const pagination = data?.meta || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };
  return (
    <div>
      <UserTable data={data?.data} />
      <PaginationControls meta={pagination} />
    </div>
  );
};

export default page;
