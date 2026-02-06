import { z } from "zod";
export const loginSchema = z.object({
  email: z.string("Email is required").email("Invalid email"),
  password: z
    .string("Password is required")
    .min(5, "Must be at least 8 character"),
});

export const medicineSchema = z.object({
  categoryId: z.string().uuid("Category is required"),
  generic: z.string().min(1, "Generic name is required"),
  title: z.string().min(1, "Title is required"),
  manufacturer: z.string().min(1, "Manufacturer is required"),
  price: z.number().min(0),
  availableQuantity: z.number().min(0),
  details: z.string().min(1).max(200),
  isAvailable: z.boolean(),
  thumbnail: z.string().url("Invalid image URL"),
});

export type MedicineFormValues = z.infer<typeof medicineSchema>;
