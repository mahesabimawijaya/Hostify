"use client";
import { useEffect, useState } from "react";
import { NavbarData } from "@/types/asset";
import { fetchData } from "@/lib/axios";
import Button from "../ui/Button";

const Navbar: React.FC = () => {
  const [navbarData, setNavbarData] = useState<NavbarData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("All environment variables:", process.env);

    const fetchAsset = async () => {
      try {
        console.log("start 1");

        const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

        const res = await fetchData("cms", "navbar", token);
        if (res?.data?.attributes) {
          setNavbarData({
            loginBtn: res.data.attributes.loginBtn,
            signUpBtn: res.data.attributes.signUpBtn,
            logoText: res.data.attributes.logoText,
            logo: res.data.attributes.logo,
          });
        } else {
          console.error("Response structure is incorrect or data is missing");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAsset();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!navbarData) {
    return <div>No data found</div>;
  }

  return (
    <nav className="flex items-center justify-between">
      {navbarData.logo?.data?.attributes?.url && (
        <div className="flex items-center space-x-2">
          <img
            src={navbarData.logo.data.attributes.url}
            alt={navbarData.logo.data.attributes.name}
            className="h-10"
          />
          <h1 className="text-lg font-bold">{navbarData.logoText}</h1>
        </div>
      )}
      <div className="flex space-x-4">
        <Button text={navbarData.loginBtn} stroke={true} />
        <Button text={navbarData.signUpBtn} stroke={false} />
      </div>
    </nav>
  );
};

export default Navbar;
