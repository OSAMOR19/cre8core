"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/images/logo.png"; // Adjust path if needed
import { FaTwitter, FaTelegramPlane, FaDiscord } from "react-icons/fa";

const footerLinks = [
  {
    title: "Opportunities",
    links: [
      { name: "Browse Jobs", href: "#" },
      { name: "Active Bounties", href: "#" },
      { name: "Upcoming Hackathons", href: "#" },
      { name: "Grant Programs", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Base Documentation", href: "#" },
      { name: "Developer Tools", href: "#" },
      { name: "Community Forum", href: "#" },
      { name: "Success Stories", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ],
  },
];

const socialMediaLinks = [
  { name: "X (Formerly Twitter)", href: "#", icon: <FaTwitter size={20} /> },
  { name: "Telegram", href: "#", icon: <FaTelegramPlane size={20} /> },
  { name: "Discord", href: "#", icon: <FaDiscord size={20} /> },
];

const Footer = () => {
  return (
    <footer className="bg-[#F2F2F2] pt-12 pb-8 border-t border-gray-200 relative overflow-hidden font-roboto">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 footer_bg">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-5 space-y-6">
            <h2 className="text-4xl font-normal text-slate-900 leading-tight font-mont">
              Cre8core Labs Fueling <br />
              the Creative Layer of <br />
              <span className="text-[#DCBD7A]">Base</span>
            </h2>
            <div className="flex items-center gap-4 pt-4">
              {socialMediaLinks.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-[#E6E6E6] text-slate-700 hover:bg-[#EBB643] hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-sm text-slate-500 font-montserrat pt-4">
              ©, 2025, Base all right reserved
            </p>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section, index) => (
          <div key={index} className="col-span-1 md:col-span-2 space-y-6">
            <h3 className="text-lg font-semibold text-slate-500 font-montserrat">
              {section.title}
            </h3>
            <ul className="space-y-4 text-slate-500 font-montserrat font-light">
                {section.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <Link
                  href={link.href}
                  className="hover:text-[#EBB643] transition-colors"
                >
                  {link.name}
                </Link>
              </li>
                ))}
             
            </ul>
          </div>))}

          

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-300/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/">
            <Image src={Logo} alt="Cre8core Labs" width={120} height={32} />
          </Link>
          <div className="flex items-center font-montserrat gap-8 text-sm text-slate-600">
            <Link href="#" className="hover:text-[#EBB643] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[#EBB643] transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-[#EBB643] transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
