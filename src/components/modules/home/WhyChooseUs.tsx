"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, FileText, Truck, Headphones } from "lucide-react";

const features = [
  {
    title: "Licensed Pharmacies",
    description:
      "All medicines are sourced from government-approved and verified pharmacies.",
    icon: ShieldCheck,
  },
  {
    title: "Prescription Safety",
    description:
      "Secure prescription upload and pharmacist validation before delivery.",
    icon: FileText,
  },
  {
    title: "Fast & Secure Delivery",
    description: "Same-day or next-day delivery with tamper-proof packaging.",
    icon: Truck,
  },
  {
    title: "24/7 Support",
    description: "Get help from qualified pharmacists anytime you need.",
    icon: Headphones,
  },
];

export function WhyChooseUs() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section aria-labelledby="trust-title" className="bg-muted/40 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2
            id="trust-title"
            className="text-3xl lg:text-5xl font-bold tracking-tight "
          >
            Trusted Medicine Delivery
          </h2>
          <p className="mt-4 text-muted-foreground">
            WHO-approved sources · Licensed pharmacies · Safe doorstep delivery
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={
                  prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
                className="group rounded-xl bg-background p-6 shadow-sm ring-1 ring-border transition hover:shadow-md focus-within:ring=[#2F91CC]"
                tabIndex={0}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:scale-105"
                    aria-hidden="true"
                  >
                    <Icon className="h-6 w-6 text-[#FA941E]" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
