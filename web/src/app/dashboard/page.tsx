"use client";
import AdminProductSection from "@/components/section/AdminProductSection";
import TransactionSection from "@/components/section/TransactionSection";
import { useAppSelector } from "../hooks";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const user = useAppSelector((state) => state.auth);
  const router = useRouter();

  if (user && user?.role !== "admin") {
    router.push("/");
  }
  return (
    <>
      <AdminProductSection />
      <TransactionSection />
    </>
  );
}
