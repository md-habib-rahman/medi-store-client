"use server"
import { catData, categoryService, ServiceOptions } from "@/services/category.service"
import { GetMedicinePrams, MedicineData, MedicineService } from "@/services/medicine.service"
import { updateUserStatus } from "@/services/user.service"
import { userStatusPayload } from "@/types/user.types"
import { updateTag } from "next/cache"

export const getMedicine = async (params?: GetMedicinePrams, ServiceOptions?: ServiceOptions) => {
	const res = await MedicineService.getMedicine(params, ServiceOptions)
	return res
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

export const updateMedicine = async (id: string, data: MedicineData) => {
	const res = await MedicineService.updateMedicine(id, data)
	updateTag("medicine")
	return res
}

export const stockUpdateMedicine = async (id: string, quantity: number) => {
	const res = await MedicineService.updateMedicineStock(id, quantity)
	updateTag("medicine")
	return res
}

export const userUpdateStatus = async (id: string, payload: userStatusPayload) => {
	const res = await updateUserStatus(id, payload)
	return res
}

export const deleteCategory = async (id: string) => {
	const res = await categoryService.deleteCategory(id)
	updateTag("categories")
	return res
}
export const deleteMedicine = async (id: string) => {
	const res = await MedicineService.deleteMedicine(id)
	updateTag("medicines")
	return res
}