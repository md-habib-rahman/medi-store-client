"use server"
import { catData, categoryService } from "@/services/category.service"
import { MedicineData, MedicineService } from "@/services/medicine.service"
import { updateTag } from "next/cache"

export const getMedicine = async () => {
	return await MedicineService.getMedicine()
}

export const getCategory = async () => {
	return await categoryService.getCategory()
}

export const addCategory = async (data: catData) => {
	const res = await categoryService.createCategory(data)
	updateTag("categories")
	return res
}

export const addMedicine = async (data: MedicineData) => {
	const res = await MedicineService.createMedicine(data)
	updateTag("medicine")
	return res
}
export const deleteCategory = async (id: string) => {
	const res = await categoryService.deleteCategory(id)
	updateTag("categories")
	return res
}