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
import { PaginationMeta } from "@/types/order.typs";

type MedicineTableProps = {
  data: any;
};

export function MedicineTableAdmin({
  data,
  pagination,
}: {
  data: MedicineTableProps;
  pagination:PaginationMeta
}) {
  const { limit, page: currentPage, total, totalPages } = pagination;
  return (
    <Table>
      <TableHeader className="bg-gray-300">
        <TableRow>
          <TableHead>SN</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Manufacturer</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Generic</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data?.map((med: MedicineCardType, index: number) => (
          <TableRow key={med.id}>
            <TableCell className="font-medium">
              {(currentPage - 1) * limit + index + 1}
            </TableCell>
            <TableCell className="font-medium">{med.title}</TableCell>
            <TableCell className="font-medium">{med.manufacturer}</TableCell>
            <TableCell className="font-medium">{med.category.title}</TableCell>
            <TableCell className="font-medium">{med.generic}</TableCell>
            <TableCell className="font-medium">{med.price}</TableCell>
            <TableCell className="font-medium ">
              {med.availableQuantity}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
