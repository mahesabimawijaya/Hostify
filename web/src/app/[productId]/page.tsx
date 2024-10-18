"use client";

import Navbar from "@/components/navbar/Navbar";
import Dropdown from "@/components/ui/Dropdown";
import Loading from "@/components/ui/Loading";
import { createData, fetchData } from "@/lib/axios";
import { Product } from "@/types/product";
import { toRupiah } from "@/utils/helper";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";
import { User } from "../../../models/user.model";
import { useRouter } from "next/navigation";

export default function ProductDetail({ params }: { params: { productId: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [duration, setDuration] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const loggedinUser = useAppSelector((state) => state.auth) as User;
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const subtotal = Math.round((duration / product?.term) * product?.price);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetchData("api", `products/${params.productId}`);
        setProduct(res.data);
      } catch (error) {
        throw new Error(error as string);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [params.productId]);

  const handleSubmit = async () => {
    try {
      if (!loggedinUser.id) {
        router.push("/login");
      } else {
        const res = await createData(
          "api",
          "transaction",
          {
            term: duration,
            amount: subtotal,
            productId: params.productId,
            userId: loggedinUser.id,
          },
          "application/json"
        );
        window.location.href = res.data.data.paymentUrl;
      }
    } catch (error) {
      throw new Error(error as string);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Navbar />
      <div className="w-full h-screen bg-gray-100">
        <div className="w-full flex flex-col max-w-[1112px] mx-auto pt-[80px] mb-10">
          <h1 className="text-5xl font-semibold text-primary mb-8">Your Cart</h1>
          <div className="flex items-start justify-between">
            <div id="product-card" className="flex flex-col w-[726px] h-[240px] bg-white rounded shadow-xl p-[24px]">
              <h3 className="text-3xl font-semibold tracking-wide mb-5">Hosting {product?.name}</h3>
              <hr />
              <div className="flex items-start mt-8">
                <div className="flex items-center">
                  <Dropdown setDuration={setDuration} />
                  <p className="ml-5 text-lg font-semibold w-[130px]">
                    {duration} {duration! > 1 ? "months" : "month"}
                  </p>
                </div>
                <div id="product-info" className="flex flex-wrap ml-3 w-[400px]">
                  <div className="border mr-2 mb-2 px-3 py-1 rounded-full border-primary text-primary">{product?.storage} GB</div>
                  <div className="border mr-2 mb-2 px-3 py-1 rounded-full border-primary text-primary">{product?.totalVisit} Total Visit</div>
                  <div className="border mr-2 mb-2 px-3 py-1 rounded-full border-primary text-primary">{product?.totalWeb} Total Website</div>
                  <div className="border mr-2 mb-2 px-3 py-1 rounded-full border-primary text-primary capitalize">{product?.backup} backup</div>
                </div>
              </div>
            </div>
            <div id="checkout-card" className="flex flex-col justify-between p-[24px] w-[300px] h-[200px] shadow-xl bg-white">
              <div className="flex flex-col">
                <h4 className="font-semibold text-xl mb-3">Subtotal</h4>
                <h2 className="text-3xl">{toRupiah(subtotal!)}</h2>
              </div>
              <button
                onClick={handleSubmit}
                disabled={loggedinUser.role === "admin"}
                className="bg-primary text-white hover:bg-transparent hover:text-primary border border-primary text-bold uppercase duration-150 rounded py-3 disabled:opacity-70 disabled:hover:bg-primary disabled:hover:text-white"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
