// import { useParams } from "next/navigation"

import MedicineDetail from "@/components/ui/MedicineDetail";
import { MedicineService } from "@/services/medicine.service";

export default async function MedicineDetailPage({params}:{params:Promise<{id:string}>}){
	// const {id}=useParams()
const {id}=await params;
// console.log({id})

const {data}=await MedicineService.getMedicineById(id)

const medicine=data?.data?.data[0]

console.log(data)
	
return(
		<div>
			<MedicineDetail medicine={medicine}/>
		</div>
	)
}