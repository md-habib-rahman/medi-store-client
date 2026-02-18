"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types/categories.types";
import { useRouter, useSearchParams } from "next/navigation";

function PublicDropDownCategory({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId") ?? undefined;

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("categoryId", value);
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  //   console.log({ categoryId });
  //   console.log(items);
  return (
    <div className="flex items-center gap-2">
      <p>Category</p>
      <Select value={currentCategoryId} onValueChange={handleChange}>
        <SelectTrigger className="w-xs">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>

        <SelectContent>
          {categories.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default PublicDropDownCategory;
