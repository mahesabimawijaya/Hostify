import LoginForm from "@/components/forms/LoginForm";
import React from "react";

function LoginPage() {
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center bg-[#F7F3FF]">
        <div className="flex flex-row justify-between">
          <div className="h-full w-2/5 mx-8 lg:flex justify-center sm:hidden md:hidden">
            <img
              src="/login.svg"
              alt=""
              className=" lg:flex sm:hidden md:hidden"
            />
          </div>
          <div className="p-10 rounded-xl bg-white">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
