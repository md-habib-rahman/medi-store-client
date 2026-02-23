"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Manufacturer } from "@/types/manufacturer.types";
import { useRouter, useSearchParams } from "next/navigation";

function PublicDropDownManufacturer({
  manufacturers: items,
}: {
  manufacturers: Manufacturer[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentManufacturer = searchParams.get("manufacturer") ?? undefined;
  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("manufacturer", value);
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };
  //   console.log(manufacture);
  return (
    <div className="flex items-center gap-2 justify-between w-full">
      <p>Manufacturer</p>
      <Select value={currentManufacturer} onValueChange={handleChange}>
        <SelectTrigger className="w-xs">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>

        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.manufacturer} value={item.manufacturer}>
              {item.manufacturer}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default PublicDropDownManufacturer;
