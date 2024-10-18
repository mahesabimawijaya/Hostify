"use client";
import React, { useState } from "react";
import { logout } from "@/lib/redux/user.slice";
import { useAppDispatch } from "@/app/hooks";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/hooks";
import Image from "next/image";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const user = useAppSelector((state) => state.auth);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
    window.location.reload();
  };
  const handleHome = () => {
    router.push("/");
  };

  return (
    <div className="flex z-50">
      <span
        className="sticky lg:hidden text-gray-600 text-4xl cursor-pointer"
        onClick={toggleSidebar}
      >
        {/* <Image src="/hamburgerr.svg" width={20} height={20} alt="home" /> */}
      </span>

      <div
        className={`fixed lg:static top-0 bottom-0 lg:flex lg:flex-col p-2 w-[300px] overflow-y-auto text-center bg-white border border-r ${
          isSidebarOpen ? "" : "hidden lg:block"
        }`}
      >
        {/* logo */}
        <div className=" text-xl">
          <div className="p-3 flex items-center gap-2">
            <img src="/hostify.png" alt="Logo" width={60} />
            {/* <IoMdClose
              className="cursor-pointer ml-auto lg:hidden"
              onClick={toggleSidebar}
            /> */}
            <h1 className="font-bold">Hostify</h1>
          </div>
        </div>

        <hr />

        <div className="p-2.5 my-3 flex  text-black">
          <div className="ml-4 text-left">
            <h1 className="text-[15px] font-semibold">Admin</h1>
            <h1 className="text-[15px]">{user?.email}</h1>
          </div>
        </div>
        <hr />

        {/* home */}
        <div
          onClick={handleHome}
          className="p-2.5 mt-3 flex items-center rounded-full px-4 duration-300 cursor-pointer hover:bg-zinc-300 text-black"
        >
          <div className="text-xl">
            <Image src="/home.svg" width={20} height={20} alt="home" />
          </div>
          <span className="text-[15px] ml-4 font-semibold text-black ">
            Home
          </span>
        </div>

        {/* order list */}
        <div className="p-2.5 mt-3 flex items-center rounded-full px-4 duration-300 cursor-pointer hover:bg-zinc-300 text-black">
          <Image src="/order.svg" width={20} height={20} alt="order" />
          <span className="text-[15px] ml-4 font-semibold text-black ">
            Order List
          </span>
        </div>

        {/* settings */}
        <div className="p-2.5 mt-3 flex items-center rounded-full px-4 duration-300 cursor-pointer  hover:bg-zinc-300  text-black">
          <Image src="/account.svg" width={20} height={20} alt="home" />
          <span className="text-[15px] ml-4 text-black font-semibold">
            Account Information
          </span>
        </div>

        {/* logout */}
        <div
          className="p-2.5 mt-3 flex items-center rounded-full px-4 duration-300 cursor-pointer  hover:bg-zinc-300  text-black"
          onClick={handleLogout}
        >
          <span className="text-[15px]  text-black font-semibold">Log out</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
