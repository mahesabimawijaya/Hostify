import AdminProductCard from "@/components/cards/AdminProductCard";
import AdminProductSection from "@/components/section/AdminProductSection";
import TransactionSection from "@/components/section/TransactionSection";

export default function Dashboard() {
  return (
    <>
      <AdminProductSection />
      <TransactionSection />
    </>
  );
}
