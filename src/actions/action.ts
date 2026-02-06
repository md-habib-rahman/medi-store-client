"use server"
import { catData, categoryService } from "@/services/category.service"
import { MedicineService } from "@/services/medicine.service"
import { CategoryResType } from "@/types/medicine.types"
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
export const deleteCategory = async (id: string) => {
	const res = await categoryService.deleteCategory(id)
	updateTag("categories")
	return res
}