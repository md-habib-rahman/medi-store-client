// import { useParams } from "next/navigation"

import MedicineDetail from "@/components/ui/MedicineDetail";
import { MedicineService } from "@/services/medicine.service";

export default async function MedicineDetailPage({params}:{params:Promise<{id:string}>}){
	// const {id}=useParams()
const {id}=await params;

const {data}=await MedicineService.getMedicineById(id)

const medicine=data.data[0]

// console.log(medicine)
	
return(
		<div>
			<MedicineDetail medicine={medicine}/>
		</div>
	)
}