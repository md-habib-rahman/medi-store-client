import Image from 'next/image';
import { CheckCircle2, AlertCircle, ShoppingCart, Pill, Factory, Plus, Minus, ShieldCheck } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MedicineCardType } from '@/types/medicine.types';

export default function MedicineDetail({ medicine }:{medicine:MedicineCardType}) {
//   const [quantity, setQuantity] = useState(1);

  const primaryBlue = "#2F91CC";
  const secondaryOrange = "#FA941E";

//   const updateQuantity = (val: number) => {
//     const newQty = quantity + val;
//     if (newQty >= 1 && newQty <= medicine.availableQuantity) {
//       setQuantity(newQty);
//     }
//   };

// console.log(...medicine)

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Product Image */}
        <div className="lg:col-span-5">
          <div className="relative aspect-square rounded-2xl border-2 bg-white p-8 flex items-center justify-center shadow-sm overflow-hidden" 
               style={{ borderColor: `${primaryBlue}10` }}>
            <Image
              src={medicine?.thumbnail}
              alt={medicine?.title}
              fill
              className="object-contain p-6"
              priority
            />
          </div>
          
          {/* Trust Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 p-4 rounded-lg border border-dashed border-slate-200 bg-slate-50">
            <ShieldCheck className="w-5 h-5" style={{ color: primaryBlue }} />
            <span className="text-sm font-medium text-slate-600">100% Genuine Medicine Guaranteed</span>
          </div>
        </div>

        {/* Right: Info Section */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-4">
              <Badge 
                style={{ backgroundColor: `${primaryBlue}15`, color: primaryBlue, borderColor: `${primaryBlue}30` }} 
                variant="outline"
              >
                {medicine?.category?.title}
              </Badge>
              {medicine?.isAvailable ? (
                <span className="text-sm font-medium flex items-center gap-1 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" /> In Stock
                </span>
              ) : (
                <span className="text-sm font-medium flex items-center gap-1 text-red-500">
                  <AlertCircle className="w-4 h-4" /> Currently Unavailable
                </span>
              )}
            </div>
            
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
              {medicine?.title}
            </h1>
            <div className="flex items-center gap-2 text-xl font-semibold italic" style={{ color: primaryBlue }}>
              <Pill className="w-5 h-5" />
              {medicine?.generic}
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-500 mb-6 border-b pb-6">
            <Factory className="w-4 h-4" />
            <span className="text-sm">Manufactured by: <span className="font-bold text-slate-700">{medicine?.manufacturer}</span></span>
          </div>

          {/* Pricing & Qty Selector */}
          <div className="flex flex-wrap items-end gap-8 mb-8">
            <div>
              <p className="text-sm text-slate-500 font-bold uppercase mb-1">Price</p>
              <p className="text-4xl font-black text-slate-900">
                ${medicine?.price}
              </p>
            </div>

            {medicine?.isAvailable && (
              <div className="flex flex-col gap-2">
                <p className="text-sm text-slate-500 font-bold uppercase">Quantity</p>
                <div className="flex items-center border-2 border-slate-200 rounded-xl bg-white p-1 h-12">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                 
                    className="h-10 w-10 text-slate-600 hover:bg-slate-100"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center font-bold text-xl">{medicine?.availableQuantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                  
                    className="h-10 w-10 text-slate-600 hover:bg-slate-100"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button 
              size="lg" 
              className="flex-1 h-14 text-lg font-bold shadow-lg transition-all hover:brightness-110 active:scale-[0.98]"
              style={{ backgroundColor: secondaryOrange, color: 'white' }}
              disabled={!medicine?.isAvailable}
            >
              <ShoppingCart className="mr-2 h-6 w-6" /> 
              {medicine?.isAvailable ? "Add to Cart" : "Notify when Available"}
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 border-2"
              style={{ borderColor: primaryBlue, color: primaryBlue }}
            >
              Order via WhatsApp
            </Button>
          </div>

          {/* Description Section */}
          <div className="rounded-2xl bg-white border border-slate-100 shadow-sm">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-bold text-slate-900">Medicine Overview</h3>
            </div>
            <div className="p-6">
              <p className="text-slate-600 leading-relaxed">
                {medicine?.details}
              </p>
            </div>
          </div>

          <div className="mt-auto pt-8 flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-widest">
            <span>Product ID: {medicine?.id}</span>
            <span>Updated: {new Date(medicine?.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}