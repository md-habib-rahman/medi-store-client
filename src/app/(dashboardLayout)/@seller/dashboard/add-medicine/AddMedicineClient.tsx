"use client";

import { useState } from "react";
import { AddMedicineForm } from "@/components/modules/forms/AddMedicineForm";
import { MedicineTable } from "./MedicineTable";
import PaginationControls from "@/components/ui/pagination-controls";

export default function AddMedicineClient({
  data,
  pagination,
}: {
  data: any;
  pagination: any;
}) {
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  return (
    <div>
      {/* CREATE */}
      {/* <AddMedicineForm mode="create" /> */}

      {/* UPDATE */}
      {selectedMedicine ? (
        <AddMedicineForm mode="update" initialData={selectedMedicine} />
      ) : (
        <AddMedicineForm mode="create" />
      )}

      {/* TABLE */}
      <MedicineTable
        data={data}
        onEdit={(medicine) => setSelectedMedicine(medicine)}
      />

      <PaginationControls meta={pagination} />
    </div>
  );
}
