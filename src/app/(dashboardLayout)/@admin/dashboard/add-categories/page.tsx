import { CreateCategory } from "@/components/modules/forms/AddCategoryForm";
import { CategoriesTable } from "./CategoriesTable";
import { categoryService } from "@/services/category.service";
import PaginationControls from "@/components/ui/pagination-controls";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;

  const { data } = await categoryService.getCategory({ page });
  const pagination = data?.meta||{
	limit:10,
	page:1,
	total:0,
	totalPage:1,
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8 items-center">
      <CreateCategory />
      <CategoriesTable data={data} />
      <PaginationControls meta={pagination}/>
    </div>
  );
}
