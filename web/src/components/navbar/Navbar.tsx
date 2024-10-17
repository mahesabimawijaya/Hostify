"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "@/lib/axios";
import { NavbarData } from "@/types/asset";
import Image from "next/image";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout } from "@/lib/redux/user.slice";
import { User } from "@/types/user";

const Navbar: React.FC = () => {
  const [navbarData, setNavbarData] = useState<NavbarData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const loggedinUser = useAppSelector((state) => state.auth) as User;
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const res = await fetchData("cms", "navbar");

        if (res?.data?.attributes) {
          setNavbarData({
            loginBtn: res.data.attributes.loginBtn,
            signUpBtn: res.data.attributes.signUpBtn,
            logoText: res.data.attributes.logoText,
            logo: res.data.attributes.logo,
            linkInfo: res.data.attributes.linkInfo,
            linkProduct: res.data.attributes.linkProduct,
          });
        } else {
          console.error("Data is missing");
        }
      } catch (error) {
        console.error("Error fetching:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNavbarData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!navbarData) {
    return <div>No data</div>;
  }

  // if data undefined, hardcoding img
  const logoUrl = navbarData.logo?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_CMS_IMAGE_URL}${navbarData.logo.data.attributes.url}`
    : "http://localhost:1337/uploads/Logo_2_removebg_preview_795339acdc.png";

  return (
    <nav className=" w-full max-w-[1112px] mx-auto pt-[40px] bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className=" relative w-[48px] h-[48px] mr-[10px]">
            {logoUrl ? (
              <Image src={logoUrl} fill alt="logo" />
            ) : (
              <div>No Logo</div>
            )}
          </div>
          <h1 className="font-extrabold text-[30px] tracking-tight">
            {navbarData.logoText}
          </h1>
        </div>
        <div className="flex gap-[30px] text-[16px]">
          <button className="">{navbarData.linkProduct}</button>
          <button className="">{navbarData.linkInfo}</button>

          {loggedinUser.firstName ? (
            <div className="flex items-center gap-[30px]">
              <button
                className="uppercase text-primary font-bold"
                onClick={handleLogout}
              >
                Log Out
              </button>
              <Button text={"DASHBOARD"} stroke={false} />
            </div>
          ) : (
            <>
              {" "}
              <button
                className="uppercase text-primary font-bold"
                onClick={() => router.push("/login")}
              >
                {navbarData.loginBtn}
              </button>
              <Button text={navbarData.signUpBtn} stroke={false} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
