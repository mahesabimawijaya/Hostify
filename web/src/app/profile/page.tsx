"use client";

import Loading from "@/components/ui/Loading";
import { fetchData } from "@/lib/axios";
import { Product } from "@/types/product";
import { Transaction } from "@/types/transaction";
import { toRupiah } from "@/utils/helper";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { User } from "@/types/user";
import { logout } from "@/lib/redux/user.slice";
import Image from "next/image";

const Profile = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  const productId = searchParams.get("product") || "";
  const loggedinUser = useAppSelector((state) => state.auth) as User;
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  useEffect(() => {
    if (loggedinUser.id) {
      const fetchTransactions = async () => {
        try {
          const data = await fetchData("api", `transaction/user/${loggedinUser.id}?productId=${productId}`);
          setTransactions(data.data);
        } catch (error) {
          throw new Error(error as string);
        } finally {
          setIsLoading(false);
        }
      };
      fetchTransactions();
    }
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
    fetchProducts();
  }, [productId, loggedinUser.id]);

  if (isLoading) return <Loading />;

  return (
    <section className="bg-gray-100  p-3 sm:p-5 xl:pb-[300px]">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12 pt-[10px]">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl mb-5 mt-10">Your Profile</h1>
          <button onClick={handleLogout} className="px-5 py-2 bg-red-600 text-white rounded hover:opacity-80">
            Logout
          </button>
        </div>
        <hr />
        <div className="flex items-center mt-5 bg-white p-6 rounded-full shadow-lg">
          <div className="relative w-20 h-20">
            <Image src={"/profile-user.png"} fill alt="profile" />
          </div>
          <div className="flex flex-col ml-4">
            <h3 className="text-xl font-semibold">{loggedinUser.firstName + " " + loggedinUser.lastName}</h3>
            <h4 className="text-gray-500">{loggedinUser.email}</h4>
          </div>
        </div>
        <h1 className="text-3xl mb-5 mt-14">Your Transaction History</h1>
        <hr />
        {/* start coding here */}
        <div className="bg-white  relative shadow-xl sm:rounded-lg overflow-hidden mt-5">
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
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
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
              <thead className="text-xs text-white uppercase bg-primary  ">
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
                    <td className="px-4 py-3">{toRupiah(transaction.amount)}</td>
                    <td className="px-4 py-3">{transaction.paymentStatus}</td>
                    <td className="px-4 py-3">{transaction.paymentMethod}</td>
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

export default Profile;
