import { getCategory, getMedicine } from "@/actions/action";
import PublicDropDownCategory from "@/components/modules/forms/PublicDropDownCategory";
import PublicDropDownManufacturer from "@/components/modules/forms/PublicDropDownManufacturer.";
import { otherService } from "@/services/other.service";
import PriceFilterShop from "./PriceFilterShop";
import { MedicineCard } from "@/components/MedicineCard";
import { MedicineCardType } from "@/types/medicine.types";
import PaginationControls from "@/components/ui/pagination-controls";

const API_URL = process.env.NEXT_PUBLIC_BASE_API;

export default async function Shop({
  searchParams,
}: {
  searchParams: {
    page?: string;
    categoryId?: string;
    manufacturer?: string;
    maxprice?: string;
  };
}) {
  const { page, categoryId, manufacturer, maxprice } = await searchParams;
  const categoryPromise = fetch(`${API_URL}/categories/all`).then((res) =>
    res.json(),
  );
  const manufacturePromise = otherService.getManufacturer();

  const medicineResult = await getMedicine({
    page,
    limit: 12,
    categoryId,
    manufacturer,
    maxprice,
  });

  const [data, data1] = await Promise.all([
    categoryPromise,
    manufacturePromise,
  ]);

  //   console.log(data2.data.meta);

  const pagination = medicineResult?.data?.meta || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };

  //   console.log(pagination);

  return (
    <div className="container mx-auto py-20">
      <div className="flex flex-col lg:flex-row items-center justify-around gap-2 px-4">
        <PublicDropDownCategory categories={data?.data} />
        <PublicDropDownManufacturer manufacturers={data1.data} />
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
