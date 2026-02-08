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
import { addMedicine } from "@/actions/action";

type Category = {
  id: string;
  title: string;
};

export const AddMedicineForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState<string>("");

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

    const toastId = toast.loading("Creating....");

    try {
      const formData = new FormData(e.currentTarget);

      const imageFile = formData.get("thumbnail") as File;
      let thumbnailUrl = "";

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

      //   const res = await fetch(`${API_URL}/seller/medicines`, {
      //     method: "POST",
      //     credentials: "include",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(payload),
      //   });

      const res = await addMedicine(payload);
    //   console.log(res);
      if (!res?.success) {
        toast.error(res?.error?.message, { id: toastId });
      }
      toast.success("Medicine Created", { id: toastId });
        // e.currentTarget.reset();
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto p-4">
      <CardTitle>Add Medicine</CardTitle>
      <CardDescription>Add your medicine details</CardDescription>

      <CardContent>
        <form id="medicine-form" onSubmit={handleSubmit}>
          <FieldGroup className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input name="title" required />
            </Field>

            <Field>
              <FieldLabel>Generic</FieldLabel>
              <Input name="generic" required />
            </Field>

            <Field>
              <FieldLabel>Manufacturer</FieldLabel>
              <Input name="manufacturer" required />
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
              <Input type="number" name="price" required />
            </Field>

            <Field>
              <FieldLabel>Available Quantity</FieldLabel>
              <Input type="number" name="availableQuantity" required />
            </Field>

            <Field className="col-span-2">
              <FieldLabel>Details</FieldLabel>
              <Textarea name="details" required />
            </Field>

            <Field>
              <FieldLabel>Thumbnail</FieldLabel>
              <Input type="file" name="thumbnail" accept="image/*" />
            </Field>

            <Field>
              <label className="flex items-center gap-2 mt-6">
                <input type="checkbox" name="isAvailable" defaultChecked />
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
