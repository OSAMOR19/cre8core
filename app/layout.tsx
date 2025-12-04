import "./globals.css";
import { ClientLayout } from "@/components/Layout/ClientLayout";
import { Metadata } from "next";
import { montserrat, roboto, nunito } from "./font";

export const metadata: Metadata = {
  title: {
    template: "Cre8core - %s",
    default: "Cre8core",
  },
  description:
    "Send, Spend, Shop Perform cross-border transaction with ease on Cre8core.",
  icons: { icon: "/images/favicon.png" },
  keywords: [
    "cross-border payments",
    "NFC",
    "NFC payments",
    "Contactless payments",
    "QR payments",
    "international money transfer",
    "send money to Africa",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${roboto.variable} ${nunito.variable} bg-[#F8F8F8]`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
