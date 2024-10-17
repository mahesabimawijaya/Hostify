import RegisterForm from "@/components/forms/RegisterForm";
import React from "react";

function RegisterPage() {
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center bg-[#F7F3FF]">
        <div className="flex flex-row justify-between">
          <div className="p-10 rounded-xl bg-white">
            <RegisterForm />
          </div>
          <div className="h-full w-2/5 mx-8 lg:flex justify-center items-center my-auto sm:hidden md:hidden">
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
