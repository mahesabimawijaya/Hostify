"use client";

import { deleteData, fetchData } from "@/lib/axios";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import Loading from "../ui/Loading";
import Image from "next/image";
import { toRupiah } from "@/utils/helper";
import Swal from "sweetalert2";

interface AdminProductCardProps {
  onEdit: (productId: number) => void;
}

function AdminProductCard({ onEdit }: AdminProductCardProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await fetchData("api", "products");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const toggleDropdown = (productId: number) => {
    setDropdownVisible((prev) => (prev === productId ? null : productId));
  };

  const handleDelete = async (productId: number) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete the plan!",
    });

    if (confirmed.isConfirmed) {
      try {
        await deleteData("api", `products/${productId}`);
        setProducts((prev) =>
          prev.filter((product) => product.id !== productId)
        );
        Swal.fire("Deleted!", "Your plan has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting plan:", error);
        Swal.fire("Error!", "There was a problem deleting the plan.", "error");
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div
      className="flex flex-wrap gap-8 tracking-tight bg-[#F7F3FF] mx-auto overflow-x-auto
    "
    >
      {products.length < 1 ? (
        <p className="text-lg font-semibold text-center mt-8">
          No plans yet. Add a new plan!
        </p>
      ) : (
        <div className="flex gap-7 tracking-tight flex-start">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[22rem] flex flex-col border-2 border-zinc-200 bg-white rounded-xl p-4 gap-3 relative"
            >
              <div className="flex flex-row justify-between">
                <h3 className="w-60 text-2xl font-semibold">{product.name}</h3>
                <button
                  className="
                bg-primary my-4 px-2 rounded-lg text-white hover:bg-white hover:text-primary hover:border-primary hover:border-2 border-2 border-primary relative"
                  onClick={() => toggleDropdown(product.id)}
                >
                  •••
                </button>
                {dropdownVisible === product.id && (
                  <div className="absolute top-[45px] right-10 bg-white border border-gray-200 shadow-lg rounded-md w-[120px]">
                    <p
                      className="text-sm text-center px-10 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => onEdit(product.id)}
                    >
                      Edit
                    </p>
                    <p
                      className="text-sm text-center px-10 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </p>
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-bold">
                {toRupiah(product.price)}{" "}
                <span className="text-sm font-semibold text-center">
                  / {product.term} mo
                </span>
              </h3>

              <div>
                <h2 className="font-semibold">Summary:</h2>
                <p className="mx-auto text-zinc-600">{product.description}</p>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center text-[18px] space-x-2">
                  <div className="relative w-[30px] h-[30px]">
                    <Image src={"/checklist.png"} fill alt="checklist" />
                  </div>
                  <p className="text-sm">{product.storage} GB RAM</p>
                </div>
                <div className="flex items-center text-[18px] space-x-2">
                  <div className="relative w-[30px] h-[30px]">
                    <Image src={"/checklist.png"} fill alt="checklist" />
                  </div>
                  <p className="text-sm">{product.totalWeb} Total Website</p>
                </div>
                <div className="flex items-center text-[18px] space-x-2">
                  <div className="relative w-[30px] h-[30px]">
                    <Image src={"/checklist.png"} fill alt="checklist" />
                  </div>
                  <p className="text-sm">{product.totalVisit} Total Visit</p>
                </div>
                <div className="flex items-center text-[18px] space-x-2">
                  <div className="relative w-[30px] h-[30px]">
                    <Image src={"/checklist.png"} fill alt="checklist" />
                  </div>
                  <p className="text-sm">
                    <span className="capitalize">{product.backup}</span> Backup
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminProductCard;
