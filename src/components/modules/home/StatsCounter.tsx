"use client";

import { useEffect, useRef, useState } from "react";
import { PackageCheck, Users, ShieldCheck, MapPin } from "lucide-react";

type StatItem = {
  label: string;
  value: number;
  suffix?: string;
  icon: React.ElementType;
};

const stats: StatItem[] = [
  {
    label: "Medicines Delivered",
    value: 120000,
    suffix: "+",
    icon: PackageCheck,
  },
  {
    label: "Verified Sellers",
    value: 350,
    suffix: "+",
    icon: ShieldCheck,
  },
  {
    label: "Happy Customers",
    value: 90000,
    suffix: "+",
    icon: Users,
  },
  {
    label: "Cities Covered",
    value: 45,
    suffix: "+",
    icon: MapPin,
  },
];

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(target / (duration / 16));

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
}

export default function StatsCounter() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      
      className="bg-white py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
		<h3 className="text-center text-4xl font-bold my-5">Our Service in numbers</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const count = useCountUp(stat.value);

            return (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center bg-gray-50 rounded-xl p-6 shadow-sm"
              >
                <div className="mb-3 flex items-center justify-center w-12 h-12 rounded-full bg-[#2F91CC]/10">
                  <Icon className="w-6 h-6 text-[#2F91CC]" aria-hidden />
                </div>

                <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {visible ? count.toLocaleString() : 0}
                  {stat.suffix}
                </div>

                <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
