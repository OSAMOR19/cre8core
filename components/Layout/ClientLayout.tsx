"use client";

import Navbar from "@/components/common/Navbar/Navbar";
import { usePathname } from "next/navigation";
import Footer from "../common/Footer/footer";
import Header from "../common/Header/page";
import { AuthProvider } from "@/components/providers/AuthProvider";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        {!isAuthPage && <Header />}
        <main className={`grow ${isAuthPage ? "" : "mt-20"}`}>{children}</main>
        {!isAuthPage && <Footer />}
      </div>
    </AuthProvider>
  );
}
