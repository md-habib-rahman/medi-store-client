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
import {  MedicineCardType } from "@/types/medicine.types";
import Link from "next/link";
import { Button } from "./ui/button";

interface ProductPrice {
  regular: number;
  sale?: number;
  currency: string;
}

interface Product {
  name: string;
  image: {
    src: string;
    alt: string;
  };
  link: string;
  description: string;
  price: ProductPrice;
  badge: {
    text: string;
    backgroundColor?: string;
  };
}

const PRODUCT_CARD: Product = {
  name: "Vexon CoreStep '08 LX",
  image: {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/joshua-diaz-ETNoDLl8yFE-unsplash-1.jpg",
    alt: "",
  },
  link: "#",
  description:
    "Everyday comfort meets bold tri-color style in this performance-driven design.",
  price: {
    regular: 499.0,
    sale: 399.0,
    currency: "USD",
  },
  badge: {
    text: "Selling fast!",
    backgroundColor: "oklch(50.5% 0.213 27.518)",
  },
};

interface ProductCard1Props {
  className?: string;
}

const MedicineCard = ({ medicine }:MedicineCardType) => {
  const { regular, sale, currency } = PRODUCT_CARD.price;

  return (
    <Link
      href={PRODUCT_CARD.link}
      className={cn(
        "block max-w-md transition-opacity hover:opacity-80",
        
      )}
    >
      <Card className="h-full overflow-hidden p-0">
        <CardHeader className="relative block p-0">
          <AspectRatio ratio={1.268115942} className="overflow-hidden">
            <img
              src={PRODUCT_CARD.image.src}
              alt={PRODUCT_CARD.image.alt}
              className="block size-full object-cover object-center"
            />
          </AspectRatio>
       
            <Badge
             
              className="absolute start-4 top-4"
            >
              {medicine.generic}
            </Badge>
			 <Badge
             
              className="absolute end-4 top-4"
            >
              {medicine.category.title}
            </Badge>
          
        </CardHeader>
        <CardContent className="flex h-full flex-col gap-4 pb-6">
          <CardTitle className="text-xl font-semibold">
            {medicine.title}
          </CardTitle>
          <CardDescription className="font-medium text-muted-foreground">
            {medicine.details}
          </CardDescription>
          <div className="mt-auto flex justify-between">
            <Price className="text-lg font-semibold">
              <PriceValue
                price={medicine.price}
                currency={currency}
                variant="regular"
              />
              
            </Price>
			<div className="flex justify-between gap-2">
				<Button>Add to Cart</Button>
				<Button>Go to Seller's Page</Button>
			</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export { MedicineCard };
