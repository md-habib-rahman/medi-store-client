"use client";

import { motion } from "framer-motion";
import {
  Pill,
  Stethoscope,
  HeartPulse,
  Baby,
  Syringe,
  ShieldPlus,
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    id: "prescription",
    title: "Prescription Medicines",
    description: "Doctor prescribed medicines",
    icon: Pill,
    href: "/categories/prescription",
  },
  {
    id: "otc",
    title: "OTC Medicines",
    description: "Common health solutions",
    icon: ShieldPlus,
    href: "/categories/otc",
  },
  {
    id: "diabetes",
    title: "Diabetes Care",
    description: "Monitor & manage sugar",
    icon: Syringe,
    href: "/categories/diabetes",
  },
  {
    id: "heart",
    title: "Heart & BP",
    description: "Cardiac health support",
    icon: HeartPulse,
    href: "/categories/heart",
  },
  {
    id: "baby",
    title: "Baby & Mother Care",
    description: "Gentle & safe products",
    icon: Baby,
    href: "/categories/baby-care",
  },
  {
    id: "devices",
    title: "Medical Devices",
    description: "Essential health equipment",
    icon: Stethoscope,
    href: "/categories/devices",
  },
];

export default function Categories() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h2
            id="categories-heading"
            className="text-3xl font-bold text-gray-900"
          >
            Shop by Category
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Find medicines and healthcare products quickly by browsing
            categories.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Link
                  href={category.href}
                  className="group block h-full rounded-xl border bg-gray-50 p-4 text-center transition hover:shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#FA941E]"
                >
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-[#FA941E]/10 group-hover:bg-[#FA941E]/20">
                    <Icon className="w-6 h-6 text-[#FA941E]" aria-hidden />
                  </div>

                  <h3 className="text-sm font-semibold text-gray-900">
                    {category.title}
                  </h3>

                  <p className="mt-1 text-xs text-gray-600">
                    {category.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
