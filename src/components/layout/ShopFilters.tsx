"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Category = {
  id: string;
  title: string;
};

type Props = {
  onChange: (filters: any) => void;
};

const PRICE_RANGES = [
  { label: "Any price", value: "any" },
  { label: "৳0 – ৳100", value: "0-100" },
  { label: "৳100 – ৳300", value: "100-300" },
  { label: "৳300 – ৳500", value: "300-500" },
  { label: "৳500+", value: "500+" },
];

export const ShopFilters = ({ onChange }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);

  const [categoryId, setCategoryId] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [priceRange, setPriceRange] = useState("any");
  const API_URL = process.env.NEXT_PUBLIC_BASE_API;
  const [loading, setLoading] = useState(true);
  // 🔹 fetch filter data
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setLoading(true);
        const categoryRes = await fetch(`${API_URL}/categories/all`);
        const categoriesData = await categoryRes.json();
        setCategories(categoriesData.data);

        const manufacturerRes = await fetch(`${API_URL}/manufacturer`);

        const manufacturerData = await manufacturerRes.json();
        setManufacturers(manufacturerData.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch filter options", error);
      }
    };

    fetchFilters();
  }, []);
  console.log(manufacturers);

  // 🔹 sync filters to parent
  //   useEffect(() => {
  //     let minPrice: number | undefined;
  //     let maxPrice: number | undefined;

  //     if (priceRange !== "any") {
  //       const [min, max] = priceRange.split("-");
  //       minPrice = Number(min);
  //       maxPrice = max ? Number(max) : undefined;
  //     }

  //     onChange({
  //       categoryId: categoryId || undefined,
  //       manufacturer: manufacturer || undefined,
  //       minPrice,
  //       maxPrice,
  //     });
  //   }, [categoryId, manufacturer, priceRange]);

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      {/* Category */}
      <Select value={categoryId} onValueChange={setCategoryId}>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {!loading &&
            categories?.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.title}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {/* Manufacturer */}
      <Select value={manufacturer} onValueChange={setManufacturer}>
        <SelectTrigger>
          <SelectValue placeholder="Select manufacturer" />
        </SelectTrigger>
        <SelectContent>
          {manufacturers?.map((m) => (
            <SelectItem key={m.sl} value={m.manufacturer}>
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Price */}
      {/* <Select value={priceRange} onValueChange={setPriceRange}>
        <SelectTrigger>
          <SelectValue placeholder="Select price range" />
        </SelectTrigger>
        <SelectContent>
          {PRICE_RANGES.map((p) => (
            <SelectItem key={p.value} value={p.value}>
              {p.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}

      {/* Clear filters */}
      <Button
        variant="outline"
        onClick={() => {
          setCategoryId("");
          setManufacturer("");
          setPriceRange("any");
        }}
      >
        Clear filters
      </Button>
    </div>
  );
};
