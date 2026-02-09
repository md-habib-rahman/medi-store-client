import { MedicineCard } from "@/components/MedicineCard";
import HeroCarousel from "@/components/modules/home/HeroCarousel";
import { Button } from "@/components/ui/button";
import { MedicineService } from "@/services/medicine.service";
import { MedicineCardType } from "@/types/medicine.types";
import Link from "next/link";

const page = async () => {
  const {data} = await MedicineService.getMedicine();
  console.log(data)
  return (
    <div>
      <HeroCarousel />
      <div className="py-24 container mx-auto">
        <h2 className="font-bold text-center text-3xl lg:text-5xl">
          Checkout our Available Listing
        </h2>
        <div className="flex justify-end px-4">
          <Link href={"/shops"} className="bg-[#2F91CC] p-2 rounded-lg">View More</Link>
        </div>
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-auto my-20 px-4">
          {data?.data?.map((item: MedicineCardType) => (
            <MedicineCard key={item.id} medicine={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
