"use client";
import LoginForm from "@/components/forms/LoginForm";
import React, { useEffect } from "react";
import { useAppSelector } from "../hooks";
import { useRouter } from "next/navigation";
// import "../../global.css";

function LoginPage() {
  const user = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (user?.id) {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center bg-[#F7F3FF]">
        <div className="flex flex-row justify-between">
          <div className="h-full w-2/5 m-auto lg:flex justify-center items-center hidden">
            <img
              src="/login.svg"
              alt=""
              className=" lg:flex sm:hidden md:hidden"
            />
          </div>
          <div className="lg:p-10 mx-4 lg:m-0 rounded-xl bg-white">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
