"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Truck, Store } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HeroBanner() {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
      <Image
        src="/med_banner.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#2F91CC]/80 via-[#2F91CC]/60 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.15 }}
          className="max-w-xl text-white space-y-6"
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-black leading-tight"
          >
            Buy & Sell Medicines <br /> with Confidence
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-white/90">
            Connect with verified medical merchants, manage orders effortlessly,
            and deliver trusted healthcare products faster and safer.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/shops"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#FA941E] text-white font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white"
            >
              Browse Medicines
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white text-white font-medium hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
            >
              Become a Seller
            </Link>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="flex flex-wrap gap-6 text-sm text-white/90 pt-4"
          >
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              Verified Sellers
            </li>
            <li className="flex items-center gap-2">
              <Store className="w-5 h-5" />
              Quality Checked
            </li>
            <li className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Fast Delivery
            </li>
          </motion.ul>
        </motion.div>
      </div>
    </header>
  );
}
