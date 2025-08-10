"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { HiLocationMarker, HiPhone, HiMail } from "react-icons/hi";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <footer className="bg-primary-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-l from-white/20 to-transparent rounded-full transform translate-x-32 -translate-y-32"></div>
        <div className="absolute right-20 bottom-20 w-64 h-64 bg-gradient-to-l from-white/10 to-transparent rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-32 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Image
              src="/logo-tentatics-white.svg"
              alt="Tentatics Logo"
              width={200}
              height={60}
              className="mb-4"
            />
            <p className="text-gray-300 mb-6 max-w-sm font-light text-sm">
              Revolutionizing real estate across Southeast Asia with AI-powered
              PropTech solutions that empower developers, agencies, and agents
              to achieve unprecedented growth.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <HiLocationMarker className="text-white mt-1 text-lg" />
                <div>
                  <p className="font-medium">Jakarta, Indonesia</p>
                  <p className="text-gray-300 text-sm">Headquarters</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <HiPhone className="text-white text-lg" />
                <div>
                  <p className="font-medium">+62 21 1234 5678</p>
                  <p className="text-gray-300 text-sm">24/7 Support</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <HiMail className="text-white text-lg" />
                <div>
                  <p className="font-medium">hello@tentatics.com</p>
                  <p className="text-gray-300 text-sm">Mail Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Platform</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  ERP/CRM Platform
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  3D Property Tours
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  AI Asistent
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Digital Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Analytics Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Property Management System
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3 text-gray-300 mb-6 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Partner Program
                </Link>
              </li>
            </ul>

            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Video Tutorial
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
            <form onSubmit={handleSubmit} className="mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan Email Anda"
                className="w-full px-4 py-3 rounded-full bg-white text-slate-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30 mb-2"
                required
              />
              <p className="text-xs text-gray-300 italic mb-4">
                * Will send you weekly updates for your better finance
                managements
              </p>
            </form>

            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy & Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li className="mt-10 text-white">
                {/* Social Media */}
                <div className="flex gap-10">
                  <Link href="#" className=" transition-colors">
                    <FaLinkedin className="text-3xl" />
                  </Link>
                  <Link href="#" className=" transition-colors">
                    <FaTwitter className="text-3xl" />
                  </Link>
                  <Link href="#" className=" transition-colors">
                    <FaFacebook className="text-3xl" />
                  </Link>
                  <Link href="#" className=" transition-colors">
                    <FaInstagram className="text-3xl" />
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between container mx-auto px-4 md:px-8 lg:px-32 py-12 items-center gap-4">
        <p className="text-gray-300 text-sm">
          © 2025 Tentatics, All Right reserverd
        </p>

        <div className="flex items-center gap-6">
          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-gray-300 text-sm">
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
