import { getMedicine } from "@/actions/action";
import PaginationControls from "@/components/ui/pagination-controls";
import { MedicineTableAdmin } from "./MedicineTable";

const page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const { page } = await searchParams;

  const { data } = await getMedicine({ page });

  const pagination = data?.meta || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };
  return (
    <div>
      <MedicineTableAdmin data={data} />

      <PaginationControls meta={pagination} />
    </div>
  );
};

export default page;
