"use client";

import { fetchData } from "@/lib/axios";
import { Transaction } from "@/types/transaction";
import { useEffect, useState } from "react";
import Loading from "../ui/Loading";
import { toRupiah } from "@/utils/helper";
import { Product } from "@/types/product";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const TransactionSection = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  const productId = searchParams.get("product") || "";

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await fetchData("api", `transaction?productId=${productId}`);
        setTransactions(data.data);
      } catch (error) {
        throw new Error(error as string);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchProducts = async () => {
      try {
        const data = await fetchData("api", "products");
        setProducts(data.data);
      } catch (error) {
        throw new Error(error as string);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
    fetchProducts();
  }, [productId]);

  if (isLoading) return <Loading />;

  return (
    <section className=" bg-[#F7F3FF] sm:p-5 xl:pb-[300px]">
      <div className="mx-auto  max-w-[1112px] pt-16">
        <h1 className="font-semibold text-xl">All transactions</h1>
        {/* <hr /> */}
        {/* start coding here */}
        <div className="bg-white  relative border-2 border-zinc-200 sm:rounded-lg overflow-hidden mt-5">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-semibold text-primary">Transaction</h2>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <div className="flex items-center w-full md:w-auto">
                {/* filter button */}
                <button
                  id="filterDropdownButton"
                  data-dropdown-toggle="filterDropdown"
                  className="w-full relative md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200      "
                  type="button"
                  onClick={() => {
                    setIsActive(!isActive);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Filter by Product
                  <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </button>
                {/* filter dropdown */}
                {isActive && (
                  <div id="filter-dropdown" className="absolute bg-white rounded border shadow-md top-[60px] right-4">
                    {products.map((product, i) => (
                      <Link scroll={false} key={i} href={`?product=${product.id}`}>
                        <p
                          onClick={() => {
                            setIsActive(false);
                          }}
                          className="w-[187px] pl-3 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                          {product.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100  ">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Service
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Duration
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Total
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Payment Status
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Payment Method
                  </th>
                  <th scope="col" className="px-4 py-3">
                    User
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, i) => (
                  <tr className="border-b " key={i}>
                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap capitalize">
                      {transaction.product.name}
                    </th>
                    <td className="px-4 py-3">
                      {transaction.term} {transaction.term > 1 ? "months" : "month"}
                    </td>
                    <td className="px-4 py-3">
                      {transaction.term} {transaction.term > 1 ? "months" : "month"}
                    </td>
                    <td className="px-4 py-3">{toRupiah(transaction.amount)}</td>
                    <td className="px-4 py-3">{transaction.paymentStatus}</td>
                    <td className="px-4 py-3">{transaction.paymentMethod}</td>
                    <td className="px-4 py-3">{transaction.user.firstName}</td>
                    <td className="px-4 py-3">{new Date(transaction.createdAt).toDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionSection;
