"use client";

import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import rumedi_logo from "/rumedi_logo.png";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="relative w-40 h-12">
            <Image
              src="/rumedi_logo.png"
              alt="rumedi_logo"
              fill
              className="object-contain object-left"
              priority
            ></Image>
          </div>

          <p className="text-sm text-gray-400">
            Trusted online pharmacy delivering medicines to your doorstep
            safely.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/shops" className="hover:text-[#FA941E]">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/how-it-works" className="hover:text-[#FA941E]">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#FA941E]">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#FA941E]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/faq" className="hover:text-[#FA941E]">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[#FA941E]">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-[#FA941E]">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Subscribe</h4>
          <p className="text-sm text-gray-400 mb-3">
            Get updates on latest medicines & offers
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
            />
            <Button
              type="submit"
              className="bg-[#FA941E] hover:bg-[#e88a18] text-white"
            >
              Subscribe
            </Button>
          </form>
          <div className="flex space-x-4 mt-4">
            {/* <Link href="#" className="hover:text-white">
              <face className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-white">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-white">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-white">
              <Linkedin className="w-5 h-5" />
            </Link> */}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Rumedi. All rights reserved.
      </div>
    </footer>
  );
}
