"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <div
      
      className="relative bg-[#2F91CC] py-20 px-6 sm:px-12 text-white rounded-lg overflow-hidden mt-12"
    >
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2
          id="cta-heading"
          className="text-3xl sm:text-4xl font-bold tracking-tight"
        >
          Ready to Order Trusted Medicines?
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-white/90">
          Browse our verified catalog or upload your prescription to get
          started.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/categories">
            <Button className="bg-[#FA941E] hover:bg-[#e88a18] text-white px-8 py-3 font-medium">
              Browse Medicines
            </Button>
          </Link>

          <Link href="/upload-prescription">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#2F91CC] px-8 py-3 font-medium"
            >
              Upload Prescription
            </Button>
          </Link>
        </div>
      </div>

      {/* Optional subtle background graphics */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2F91CC]/60 to-[#FA941E]/40 -z-0"></div>
    </div>
  );
}
