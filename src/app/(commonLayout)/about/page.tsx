export const dynamic = "force-dynamic";
import CTASection from "@/components/modules/home/cta";
import StatsCounter from "@/components/modules/home/StatsCounter";

export default function AboutPage() {
  return (
    <div className="">
      {/* Hero */}
      <div className="bg-linear-to-r from-[#2F91CC] to-[#1e6fa3] text-white py-20 border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">About Rumedi</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-white/90">
            Building a safer, smarter way to access trusted medicines across
            Bangladesh.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to make authentic, affordable medicines accessible
              to everyone through a trusted digital platform verified by
              licensed professionals.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We envision a healthcare ecosystem where patients, sellers, and
              pharmacists collaborate transparently to ensure safety,
              efficiency, and peace of mind.
            </p>
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">
            Why Trust Rumedi
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                title: "Verified Sellers",
                desc: "All sellers are authenticated and reviewed regularly.",
              },
              {
                title: "Pharmacist Review",
                desc: "Every order is validated by licensed pharmacists.",
              },
              {
                title: "Secure Transactions",
                desc: "Your data and payments are fully protected.",
              },
              {
                title: "Reliable Delivery",
                desc: "Medicines delivered with proper packaging & tracking.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <StatsCounter />

      {/* Safety & Compliance */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Safety & Compliance First
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We strictly follow pharmaceutical regulations and quality standards.
            Our systems are designed to prevent counterfeit medicines, ensure
            prescription compliance, and maintain transparent order tracking.
          </p>
        </div>
      </div>

      {/* Platform Promise */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Our Promise to You
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Whether you are a patient, seller, or healthcare professional,
            Rumedi is committed to providing a platform built on trust,
            technology, and responsibility.
          </p>
        </div>
      </div>

      {/* CTA */}
      <CTASection />
    </div>
  );
}
