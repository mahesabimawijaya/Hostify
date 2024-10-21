import React from "react";
import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
// import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "@/components/navbar/Sidebar";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hostify | User Profile",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} flex h-screen`}>
      <Sidebar />
      <main className="flex-grow overflow-auto">{children}</main>
    </div>
  );
}
