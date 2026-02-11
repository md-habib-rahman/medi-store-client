import { getSellerInfo } from "@/services/user.service";
import { MedicineService } from "@/services/medicine.service";
import SellerPage from "./SellerPage";
import SellerShop from "./SellerShop";
import { otherService } from "@/services/other.service";
const API_URL = process.env.NEXT_PUBLIC_BASE_API;

async function sellerPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    sellerId: string;
    page?: string;
    categoryId?: string;
    manufacturer?: string;
    maxprice?: string;
  };
}) {
  const { sellerId, page, categoryId, manufacturer, maxprice } =
    await searchParams;
  const { id } = await params;
  // console.log({ id, page, categoryId, manufacturer, maxprice });

  const categoryPromise = fetch(`${API_URL}/categories/all`).then((res) =>
    res.json(),
  );
  const manufacturePromise = otherService.getManufacturer();

  const medicineResult = await MedicineService.getSellerMedicine({
    sellerId: id,
    page,
    limit: 8,
    categoryId,
    manufacturer,
    maxprice,
  });

  const [data1, data2] = await Promise.all([
    categoryPromise,
    manufacturePromise,
  ]);

  //   console.log(medicineResult);
  //   console.log(data2);
  //   console.log(id);
  const { data } = await getSellerInfo(id);

  const pagination = medicineResult?.data?.meta || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };
  // console.log(data);
  return (
    <div>
      <SellerPage seller={data} />
      <SellerShop
        pagination={pagination}
        data1={data1}
        data2={data2}
        medicineResult={medicineResult}
      />
    </div>
  );
}

export default sellerPage;
