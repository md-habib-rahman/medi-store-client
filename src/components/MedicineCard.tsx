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
import { MedicineCardType } from "@/types/medicine.types";
import Link from "next/link";
import { Button } from "./ui/button";

const MedicineCard = ({ medicine }: MedicineCardType) => {
  return (
    <Card className="h-full overflow-hidden p-0">
      <CardHeader className="relative block p-0">
        <AspectRatio ratio={1.268115942} className="overflow-hidden">
          <img
            src={medicine.thumbnail ? medicine.thumbnail : "rumedi_logo.png"}
            alt={medicine.title}
            className="block size-full object-cover object-center"
          />
        </AspectRatio>

        <Badge className="absolute start-4 top-4">{medicine.generic}</Badge>
        <Badge className="absolute end-4 top-4">
          {medicine.category.title}
        </Badge>
      </CardHeader>
      <CardContent className="flex h-full flex-col gap-4 pb-6">
        <Link
          href={`/shops/medicine/${medicine.id}`}
          className={cn("block max-w-md transition-opacity hover:opacity-80")}
        >
          <CardTitle className="text-xl font-semibold">
            {medicine.title}
          </CardTitle>
        </Link>
        <CardDescription className="font-medium text-muted-foreground">
          {medicine.details}
        </CardDescription>
      </CardContent>

      <div className="flex justify-between px-4 pb-4">
        <Price className="text-2xl font-bold">
          <PriceValue price={medicine.price} />
        </Price>
        <div className="flex justify-between gap-2">
          <Button>Add to Cart</Button>
          <Link href={`/seller/${medicine.sellerId}`}><Button variant={"outline"}>Seller's Page</Button></Link>
        </div>
      </div>
    </Card>
  );
};

export { MedicineCard };
