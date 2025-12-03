"use client";

import { useState } from "react";
import { Menu, X, Home, Users, Settings, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavItem from "@/components/common/Navbar/NavItem";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="">
      {/* Header */}
      {/* <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-xl font-bold text-slate-900">Cre8core</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header> */}

      {/* Sidebar */}
      {/* <aside
          className={`${
            sidebarOpen ? "w-64" : "w-0"
          } bg-white border-r border-slate-200 transition-all duration-300 overflow-hidden`}
        >
          <nav className="p-4 space-y-2">
            <NavItem icon={<Home size={18} />} label="Dashboard" active />
            <NavItem icon={<Users size={18} />} label="Team" />
            <NavItem icon={<FileText size={18} />} label="Projects" />
            <NavItem icon={<Settings size={18} />} label="Settings" />
          </nav>
        </aside> */}

      {/* Main Content */}
      <main className="">{children}</main>
    </div>
  );
}
