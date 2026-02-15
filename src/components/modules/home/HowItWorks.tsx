"use client";

import { motion } from "framer-motion";
import { Search, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from "lucide-react";

const flowSteps = [
  {
    title: "Instant Sourcing",
    sub: "01. DISCOVER",
    desc: "Snap a photo of your prescription or use our AI-powered search to find exactly what you need in seconds.",
    icon: Search,
    accent: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Expert Validation",
    sub: "02. VERIFY",
    desc: "Your health isn't a gamble. Our licensed pharmacists double-check every dosage and drug interaction before approval.",
    icon: ShieldCheck,
    accent: "text-[#FA941E]",
    bg: "bg-[#FA941E]/10",
  },
  {
    title: "Cold-Chain Logistics",
    sub: "03. RECEIVE",
    desc: "From our climate-controlled hubs to your doorstep. Sealed, tracked, and delivered in record time.",
    icon: Zap,
    accent: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

export default function ModernHowItWorks() {
  return (
    <section className="bg-[#0A0C10] py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
       
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 font-bold tracking-tighter uppercase text-4xl mb-4"
            >            
              The Next-Gen Pharmacy
            </motion.div>
       

          </div>
          <p className="text-gray-400 max-w-sm text-lg leading-relaxed">
            We've digitized the pharmacy experience to be faster, safer, and 100% transparent.
          </p>
        </div>

       
        <div className="grid grid-cols-1 gap-4">
          {flowSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-xl"
              >
                <div className="relative overflow-hidden rounded-[2rem] bg-white/[0.03] border border-white/10 p-8 md:p-12 hover:bg-white/[0.06] transition-all duration-500">
                  <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
                    
                   
                    <div className="flex-shrink-0 relative">
                      <div className={`w-20 h-20 rounded-2xl ${step.bg} flex items-center justify-center border border-white/5`}>
                        <Icon className={`w-10 h-10 ${step.accent}`} />
                      </div>
                    </div>

                   
                    <div className="flex-grow space-y-4">
                      <span className={`text-xs font-bold tracking-[0.2em] ${step.accent}`}>
                        {step.sub}
                      </span>
                      <h3 className="text-3xl font-bold text-white tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 max-w-xl text-lg">
                        {step.desc}
                      </p>
                    </div>

                   
                    <div className="hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <div className="bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 cursor-pointer">
                          Try it now <ArrowRight size={16} />
                       </div>
                    </div>
                  </div>

                
                  <span className="absolute -bottom-10 -right-4 text-[12rem] font-black text-white/[0.02] select-none pointer-events-none">
                    {idx + 1}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 flex flex-wrap justify-center gap-12 text-gray-500 font-medium"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500" size={20} />
            DGDA Approved
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500" size={20} />
            Encrypted Health Records
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500" size={20} />
            24/7 Support
          </div>
        </motion.div>
      </div>
    </section>
  );
}