"use client";
import RegisterForm from "@/components/forms/RegisterForm";
import React from "react";
import { useAppSelector } from "../hooks";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const user = useAppSelector((state) => state.auth);
  const router = useRouter();

  if (user?.id) {
    router.push("/");
  }

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center bg-[#F7F3FF]">
        <div className="flex flex-row justify-between">
          <div className="lg:p-10 rounded-xl bg-white">
            <RegisterForm />
          </div>
          <div className="h-full w-2/5 m-8 lg:flex justify-center items-center my-auto hidden">
            <img
              src="/login.svg"
              alt=""
              className=" lg:flex sm:hidden md:hidden"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
