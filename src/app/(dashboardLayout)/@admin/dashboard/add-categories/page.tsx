import { getCategory } from "@/actions/action";
import { CreateCategory } from "@/components/modules/forms/AddCategoryForm";
import { CategoriesTable } from "./CategoriesTable";

export default async function Page() {
  const { data } = await getCategory();

  console.log(data);
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8 items-center">
      <CreateCategory />
      <CategoriesTable data={data} />
    </div>
  );
}
