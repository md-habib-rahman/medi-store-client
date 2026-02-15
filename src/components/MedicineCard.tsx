"use client";
import { cn } from "@/lib/utils";

import { Price, PriceValue } from "@/components/price";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MedicineCardProps, MedicineCardType } from "@/types/medicine.types";
import Link from "next/link";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "@/services/cart.service";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";


const MedicineCard = ({ medicine }: MedicineCardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleAddToCart = (medicine) => {
    const toastId = toast.loading("Adding to Cart....");
    addToCart({
      medicineId: medicine.id,
      title: medicine.title,
      price: medicine.price,
      quantity: 1,
      sellerId: medicine.sellerId,
      thumbnail: medicine.thumbnail,
    });
	window.location.reload()
	// router.refresh();
	// console.log(pathname)
    // router.push(pathname);
    
    toast.success("Cart Updated", { id: toastId });
  };

  return (
    <Card className="h-full overflow-hidden p-0">
      <CardHeader className="relative block p-0">
        <AspectRatio ratio={1.268115942} className="overflow-hidden">
          <Image
            src={medicine.thumbnail ? medicine.thumbnail : "rumedi_logo.png"}
            alt={medicine.title}
			fill
            className="block size-full object-cover object-center"
          />
        </AspectRatio>

        <Badge
          variant={"rumedi_primary_badge"}
          className="absolute start-4 top-4"
        >
          {medicine.generic}
        </Badge>
        <Badge
          variant={"rumedi_secondary_badge"}
          className="absolute end-4 top-4"
        >
          {medicine.category.title}
        </Badge>
      </CardHeader>
      <CardContent className="flex h-full flex-col gap-4 pb-6">
        <Link
          href={`/shops/medicine/${medicine.id}`}
          className={cn("block max-w-md transition-opacity hover:opacity-80")}
        >
          <CardTitle className="text-xl font-semibold hover:underline">
            {medicine.title}
          </CardTitle>
        </Link>
        <CardDescription className="font-medium text-muted-foreground">
          {medicine.details}
        </CardDescription>
      </CardContent>

      <div className="flex flex-col justify-between px-4 pb-4">
        <Price className="text-2xl font-bold">
          <PriceValue price={medicine.price} />
        </Price>
        <div className="flex justify-between gap-2">
          <Button
            variant={"rumedi_primary"}
            onClick={() => handleAddToCart(medicine)}
          >
            <ShoppingCart />
            Add to Cart
          </Button>
          <Link href={`/seller/${medicine.sellerId}`}>
            <Button variant={"rumedi_secondary_outline"}>Seller's Page</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export { MedicineCard };
