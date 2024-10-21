"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { userLogin } from "@/lib/redux/auth.middleware";
import Swal from "sweetalert2";
import { UserLoginPayload } from "@/types/user";
import Link from "next/link";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/app/hooks";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(5, "Password should have 5 characters at minimum"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const result = await dispatch(
          userLogin({
            email: values.email,
            password: values.password,
          } as UserLoginPayload)
        );

        formik.resetForm();

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text:
              error.response.data.message ||
              "An error occurred while signing in.",
            confirmButtonText: "Try Again",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Unexpected Error",
            text: "An unexpected error occurred.",
            confirmButtonText: "Try Again",
          });
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="mx-auto text-center py-20 px-10 gap-4 flex flex-col items-center justify-center ">
      {/* header */}
      <div className="gap-2 flex items-center justify-center flex-col">
        <Link href="/">
          <img src="/hostify.png" alt="" className="w-14" />
        </Link>
        <div className="font-bold text-3xl">Welcome back to Hostify</div>
        <div className="text-zinc-400">
          Sign in and choose your perfect hosting!
        </div>
      </div>

      {/* form */}
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-60 lg:w-[500px]"
      >
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="text-left mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className={`border rounded-md p-2 ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="your@email.com"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-700 text-xs mt-1">
              {formik.errors.email}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="password" className="text-left mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`border rounded-md p-2 ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="•••••••"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-700 text-xs mt-1">
              {formik.errors.password}
            </div>
          ) : null}
        </div>

        <div className="mx-auto">
          <button
            type="submit"
            className={`bg-[#6C41FF] text-white hover:bg-white hover:text-[#6C41FF] border border-primary text-bold uppercase duration-150 w-[154px] h-[52px] rounded ${
              !formik.isValid || !formik.dirty || isSubmitting
                ? "opacity-70 cursor-not-allowed"
                : ""
            }`}
            disabled={!formik.isValid || !formik.dirty || isSubmitting}
          >
            SIGN IN
          </button>
        </div>
      </form>

      {/* register link */}
      <div className="text-sm flex flex-row gap-1">
        <div>Don&apos;t have account?</div>
        <Link
          href="/register"
          className="font-semibold text-[#6C41FF] no-underline"
        >
          Register here
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
