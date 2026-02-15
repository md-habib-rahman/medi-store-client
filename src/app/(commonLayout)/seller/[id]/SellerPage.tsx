import { formatDate } from "@/constants/formatDate";
import { MapPin, Phone } from "lucide-react";
import Image from "next/image";

export default async function SellerPage({ seller }) {
  //   console.log(seller);
  return (
    <div className="container mx-auto px-4 py-6">
      {/* ================= Seller Info Section ================= */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center border rounded-lg p-6 shadow-sm bg-background">
        {/* Logo */}
        <div className="relative w-24 h-24 rounded-md overflow-hidden border">
          <Image
            // width="800"
            // height="600"
			fill
            src={seller?.image}
            alt={seller?.name}
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{seller.name}</h1>

          <div className="mt-2 text-sm space-y-1">
            <p className="flex gap-2">
              <MapPin className="text-[#FA941E]" size={20} /> {seller.address}
            </p>
            <p className="flex gap-2 items-center">
              <Phone className="text-[#FA941E]" size={20} /> {seller.phone}
            </p>
            <p className="text-muted-foreground">
              Joined {formatDate(seller.createdAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8"></div>
    </div>
  );
}
