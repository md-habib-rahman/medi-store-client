import { MedicineCard } from "@/components/MedicineCard";
import Categories from "@/components/modules/home/Categories";
import CTASection from "@/components/modules/home/cta";
import HeroCarousel from "@/components/modules/home/HeroCarousel";
import HowItWorks from "@/components/modules/home/HowItWorks";
import StatsCounter from "@/components/modules/home/StatsCounter";
import { WhyChooseUs } from "@/components/modules/home/WhyChooseUs";
import { Button } from "@/components/ui/button";
import { MedicineService } from "@/services/medicine.service";
import { MedicineCardType } from "@/types/medicine.types";
import Link from "next/link";

const page = async () => {
  const { data } = await MedicineService.getMedicine({ limit: 8 });
  console.log(data);
  return (
    <div>
      <HeroCarousel />
      <div className="py-20 container mx-auto">
        <h2 className="font-bold text-center text-3xl lg:text-5xl mt-12">
          Checkout our Available Listing
        </h2>
        <div className="flex justify-end px-4  my-5">
          <Link href={"/shops"}>
            <Button variant={"rumedi_primary_outline"}> View More</Button>
          </Link>
        </div>
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-auto px-4">
          {data?.data?.map((item: MedicineCardType) => (
            <MedicineCard key={item.id} medicine={item} />
          ))}
        </div>
      </div>
      <WhyChooseUs />
      <StatsCounter />
      <HowItWorks />
      <Categories />
      <CTASection />
    </div>
  );
};

export default page;
