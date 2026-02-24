"use client";
import { deleteCategory } from "@/actions/action";
import Loading from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoryResponse } from "@/types/categories.types";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function CategoriesTable({ data }: { data: CategoryResponse }) {
  const [loading, setLoading] = useState(false);
  const onDelete = async (id: string) => {
    const toastId = toast.loading("Deleting....");

    try {
      setLoading(true);
      const res = await deleteCategory(id);
      if (res.error) {
        toast.error(res.error.message, { id: toastId });
        return;
      }

      toast.success("Post Deleted", { id: toastId });
    } catch (err) {
      toast.error("Something Went Wrong", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>

          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data?.map((cat) => (
          <TableRow key={cat.id}>
            <TableCell className="font-medium">{cat.title}</TableCell>

            <TableCell className="text-right">
              <Button
                className="cursor-pointer"
                onClick={() => onDelete(cat.id)}
              >
                {" "}
                <Trash />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
