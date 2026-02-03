import { MedicineCard } from "@/components/MedicineCard";
import HeroCarousel from "@/components/modules/home/HeroCarousel";
import { MedicineService } from "@/services/medicine.service";
import {  MedicineCardType } from "@/types/medicine.types";

const page = async () => {
	
const data=await MedicineService.getMedicine()
// console.log(data)
	return (
		<div>
			<HeroCarousel/>
			<div className="container grid grid-cols-3 gap-5 mx-auto my-20 px-4">
{
data?.data?.map((item:MedicineCardType)=>(
	<MedicineCard key={item.id} medicine={item}/>
))
}
			</div>
		</div>
	);
};

export default page