import PublicDropDownCategory from "@/components/modules/forms/PublicDropDownCategory";
import PublicDropDownManufacturer from "@/components/modules/forms/PublicDropDownManufacturer.";
import PriceFilterShop from "../../shops/PriceFilterShop";
import { MedicineCard } from "@/components/MedicineCard";
import PaginationControls from "@/components/ui/pagination-controls";
import { MedicineCardType, MedicineDataData } from "@/types/medicine.types";
import { PaginationMeta } from "@/types/order.typs";
import { CategoryResponse } from "@/types/categories.types";
import { ManufacturerRes } from "@/types/manufacturer.types";

const API_URL = process.env.NEXT_PUBLIC_BASE_API;

export default async function SellerShop({
  data1,
  data2,
  pagination,
  medicineResult,
}: {
  pagination: PaginationMeta;
  medicineResult: MedicineDataData;
  data1: CategoryResponse;
  data2: ManufacturerRes;
}) {
  //   console.log(data2.data.meta);

  //   console.log(pagination);

  return (
    <div className="container mx-auto py-20">
      <div className="flex flex-col lg:flex-row items-center justify-around gap-2 px-2">
        <PublicDropDownCategory categories={data1?.data} />
        <PublicDropDownManufacturer manufacturers={data2.data} />
        <PriceFilterShop />
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-20 px-4">
        {medicineResult.data.data.length === 0 ? (
          <div className="flex items-center justify-center md:col-end-2 lg:col-span-4">
            No Data Found
          </div>
        ) : (
          medicineResult.data.data?.map((item: MedicineCardType) => (
            <MedicineCard key={item.id} medicine={item} />
          ))
        )}
      </div>
      <PaginationControls meta={pagination} />
    </div>
  );
}
