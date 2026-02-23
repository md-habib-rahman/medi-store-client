"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import {
  getSession,
  updateUserImage,
  updateUserInfo,
} from "@/services/user.service";
import { uploadToImgbb } from "@/lib/uploadToImgbb";
import Loading from "@/components/shared/Loader";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  image?: string;
};

export default function AccountInformation({ user }: { user: User }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    image: user.image || "",
  });

  const [preview, setPreview] = useState<string | null>(user.image || null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);

    setFormData((prev) => ({ ...prev, image: file as any }));

    const imageUrl = await uploadToImgbb(file);
    const res = await updateUserImage(user.id, { imageUrl });
    if (res.success) {
      toast.success("Image updated!");
    } else {
      toast.error("Something went wrong!");
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await updateUserInfo(user.id, formData);
      //   console.log(res);
      if (res.success) {
        // setFormData({
        //   name: res.user.name,
        //   email: res.data.email,
        //   phone: res.data.phone ?? "",
        //   address: res.data.address ?? "",
        //   image: res.data.image ?? "",
        // });

        // console.log(res);
        toast.success("Profile updated successfully");
        router.refresh();
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>Not logged in</div>;
  if (loading) return <Loading />;

  return (
    <div className="rounded-lg shadow-sm p-6 bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Account Information
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Update your photo and personal information here
          </p>
        </div>
        <Button onClick={handleSubmit} variant="rumedi_primary">
          Save Changes
        </Button>
      </div>

      <div className="flex items-center gap-6 mb-8">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border">
          <Image
            src={preview || "/rumedi_logo.png"}
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <Label htmlFor="image" className="cursor-pointer text-[#2F91CC]">
            Change photo
          </Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 2MB</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {[
          { id: "name", label: "Name", type: "text" },
          { id: "email", label: "Email", type: "email", disabled: true },
          { id: "phone", label: "Phone Number", type: "tel" },
          { id: "address", label: "Address", type: "text" },
        ].map((field) => (
          <div
            key={field.id}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center"
          >
            <Label htmlFor={field.id} className="text-sm font-medium">
              {field.label}
            </Label>
            <div className="sm:col-span-2">
              <Input
                id={field.id}
                defaultValue={field.id}
                name={field.id}
                type={field.type}
                value={(formData as any)[field.id]}
                onChange={handleChange}
                disabled={field.disabled}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
