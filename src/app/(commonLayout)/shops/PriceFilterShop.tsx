"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function PriceFilterShop() {
  const [maxprice, setMaxprice] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("manufacturer", "");
    params.set("categoryId", "");
    router.refresh();
    router.push("/shops");
  };

  const handlePriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("maxprice", maxprice);
    router.push(`?${params.toString()}`);
  };

  //   console.log(maxprice);
  return (
    <div className="flex  gap-2 items-center justify-between w-full">
      <Input
        type={"number"}
        name="maxprice"
        value={maxprice}
		placeholder="Enter Max Price"
        onChange={(e) => {
          setMaxprice(e.target.value);
        }}
      />
      <Button variant={"outline"} onClick={handlePriceFilter}>
        Search
      </Button>
      <Button onClick={handleReset}>Reset Filter</Button>
    </div>
  );
}

export default PriceFilterShop;
