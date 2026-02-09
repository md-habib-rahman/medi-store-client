"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { uploadToImgbb } from "@/lib/uploadToImgbb";
import { ApiError } from "next/dist/server/api-utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { addMedicine, updateMedicine } from "@/actions/action";
import { Medicine } from "@/types/medicine.types";

type Category = {
  id: string;
  title: string;
};

type MedicineFormProps = {
  mode?: "create" | "update";
  initialData?: Medicine;
};

export const AddMedicineForm = ({
  mode = "create",
  initialData,
}: MedicineFormProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(initialData?.categoryId ?? "");

  const API_URL = process.env.NEXT_PUBLIC_BASE_API;

  // 🔹 fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`${API_URL}/categories/all`);
      const data = await res.json();
      setCategories(data.data);
    };

    fetchCategories();
  }, []);

  //   console.log(categories);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading(
      mode === "create" ? "Creating..." : "Updating...",
    );

    try {
      const formData = new FormData(e.currentTarget);

      const imageFile = formData.get("thumbnail") as File;
      let thumbnailUrl = initialData?.thumbnail || "";

      if (imageFile && imageFile.size > 0) {
        thumbnailUrl = await uploadToImgbb(imageFile);
      }

      const payload = {
        categoryId: formData.get("categoryId"),
        generic: formData.get("generic"),
        title: formData.get("title"),
        manufacturer: formData.get("manufacturer"),
        price: Number(formData.get("price")),
        availableQuantity: Number(formData.get("availableQuantity")),
        details: formData.get("details"),
        isAvailable: formData.get("isAvailable") === "on",
        thumbnail: thumbnailUrl,
      };

      const res =
        mode === "create"
          ? await addMedicine(payload)
          : await updateMedicine(initialData?.id!, payload);

      //   console.log(payload, mode);

      if (!res?.data?.success) {
        toast.error(res?.error?.message, { id: toastId });
        return;
      }

      toast.success(
        mode === "create" ? "Medicine Created" : "Medicine Updated",
        { id: toastId },
      );
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto p-4 mb-8">
      <CardTitle>Add Medicine</CardTitle>
      <CardDescription>Add your medicine details</CardDescription>

      <CardContent>
        <form id="medicine-form" onSubmit={handleSubmit}>
          <FieldGroup className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input name="title" required defaultValue={initialData?.title} />
            </Field>

            <Field>
              <FieldLabel>Generic</FieldLabel>
              <Input
                name="generic"
                required
                defaultValue={initialData?.generic}
              />
            </Field>

            <Field>
              <FieldLabel>Manufacturer</FieldLabel>
              <Input
                name="manufacturer"
                required
                defaultValue={initialData?.manufacturer}
              />
            </Field>

            <Field>
              <FieldLabel>Category</FieldLabel>

              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* hidden input so FormData can read it */}
              <input type="hidden" name="categoryId" value={categoryId} />
            </Field>

            <Field>
              <FieldLabel>Price</FieldLabel>
              <Input
                type="number"
                name="price"
                required
                defaultValue={initialData?.price}
              />
            </Field>

            <Field>
              <FieldLabel>Available Quantity</FieldLabel>
              <Input
                type="number"
                name="availableQuantity"
                required
                defaultValue={initialData?.availableQuantity}
              />
            </Field>

            <Field className="col-span-2">
              <FieldLabel>Details</FieldLabel>
              <Textarea
                name="details"
                required
                defaultValue={initialData?.details}
              />
            </Field>

            <Field>
              <FieldLabel>Thumbnail</FieldLabel>
              <Input type="file" name="thumbnail" accept="image/*" />
            </Field>

            <Field>
              <label className="flex items-center gap-2 mt-6">
                <input
                  type="checkbox"
                  name="isAvailable"
                  defaultChecked={initialData?.isAvailable ?? true}
                />
                Available
              </label>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          form="medicine-form"
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
};
