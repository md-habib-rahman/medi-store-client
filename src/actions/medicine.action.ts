"use server"
import { MedicineService } from "@/services/medicine.service"

export const getMedicine = async () => {
	return await MedicineService.getMedicine()
}