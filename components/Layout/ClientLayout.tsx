"use client";

import { useState } from "react";
import { Menu, X, Home, Users, Settings, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavItem from "@/components/common/Navbar/NavItem";
import Header from "@/components/common/Header/page";
import Footer from "@/components/common/Footer/footer";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="">
      <Header />

      {/* Main Content */}
      <main className="">{children}</main>

      <Footer />
    </div>
  );
}
