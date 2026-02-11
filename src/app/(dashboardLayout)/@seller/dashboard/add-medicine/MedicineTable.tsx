"use client";
import { deleteMedicine, stockUpdateMedicine } from "@/actions/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MedicineCardType } from "@/types/medicine.types";
import { ArrowRight, Pencil, Trash } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type MedicineTableProps = {
  data: any;
  onEdit: (medicine: any) => void;
};

export function MedicineTable({ data, onEdit }: MedicineTableProps) {
  const [newStock, setNewStock] = useState(0);
  const onDelete = async (id: string) => {
    const toastId = toast.loading("Deleting....");

    try {
      const res = await deleteMedicine(id);
      if (res.error) {
        toast.error(res.error.message, { id: toastId });
        return;
      }

      toast.success("Medicine Deleted", { id: toastId });
    } catch (err) {
      toast.error("Something Went Wrong", { id: toastId });
    }
  };

  const onStockeUpdate = async (id: string) => {
    // console.log({ id, newStock });
    const toastId = toast.loading("Updating Stock....");
    try {
      const { data } = await stockUpdateMedicine(id, newStock);
      //   console.log(res);
      if (data.success) {
        toast.success("Stock Updated!", { id: toastId });
      }
    } catch (err) {
      toast.error("Something Went Wrong", { id: toastId });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>SN</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Manufacturer</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-center">Generic</TableHead>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="text-center">Quantity</TableHead>

          <TableHead className=" text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data?.map((med: MedicineCardType, index: number) => (
          <TableRow key={med.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="font-medium">{med.title}</TableCell>
            <TableCell className="font-medium">{med.manufacturer}</TableCell>
            <TableCell className="font-medium">{med.category.title}</TableCell>
            <TableCell className="font-medium">{med.generic}</TableCell>
            <TableCell className="font-medium">{med.price}</TableCell>
            <TableCell className="font-medium flex items-center justify-center gap-1">
              <Input
                type="number"
                name="med_price"
                className="w-20"
                defaultValue={med.availableQuantity}
                onChange={(e) => setNewStock(Number(e.target.value))}
              ></Input>
              <Button
                onClick={() => {
                  onStockeUpdate(med.id);
                }}
              >
                {" "}
                <ArrowRight />
              </Button>
            </TableCell>

            <TableCell className="space-x-2 text-right">
              <Button
                className="cursor-pointer"
                onClick={() => onDelete(med.id)}
              >
                {" "}
                <Trash />
              </Button>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => onEdit(med)}
              >
                <Pencil />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
