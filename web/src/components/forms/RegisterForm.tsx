"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { AxiosError } from "axios";
import { createData } from "@/lib/axios";
import Swal from "sweetalert2";

const RegisterForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
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
      firstName: Yup.string()
        .required("First name is required")
        .min(3, "First name should have 3 characters at minimum"),
      lastName: Yup.string()
        .required("Last name is required")
        .min(3, "Last name should have 3 characters at minimum"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const response = await createData(
          "api",
          "users/v1",
          values,
          "application/json"
        );

        if (response.status === 201) {
          await Swal.fire({
            title: "Successfully Signed Up!",
            text: "You can now log in.",
            icon: "success",
            confirmButtonText: "OK",
          });

          router.push("/login");
        }
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          const errorMessage =
            error.response.data.message ||
            "An error occurred while signing up.";

          Swal.fire({
            icon: "error",
            title: "Registration failed!",
            text: errorMessage,
            confirmButtonText: "Try Again",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Unexpected error",
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
    <div className="mx-auto text-center py-20 px-10 gap-4 flex flex-col items-center justify-center">
      {/* header */}
      <div className="gap-2 flex items-center justify-center flex-col">
        <Link href="/">
          <img src="/hostify.png" alt="Hostify logo" className="w-14" />
        </Link>
        <div className="font-bold text-3xl">Sign up to Hostify</div>
        <div className="text-zinc-400">
          Sign up now and secure your hosting plan!
        </div>
      </div>

      {/* form */}
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-60 lg:w-[500px]"
      >
        {/* first name section */}
        <div className="flex flex-col mb-4">
          <label htmlFor="firstName" className="text-left mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className={`border rounded-md p-2 ${
              formik.touched.firstName && formik.errors.firstName
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="First Name"
            {...formik.getFieldProps("firstName")}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="text-red-700 text-xs mt-1">
              {formik.errors.firstName}
            </div>
          ) : null}
        </div>

        {/* last name */}
        <div className="flex flex-col mb-4">
          <label htmlFor="lastName" className="text-left mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className={`border rounded-md p-2 ${
              formik.touched.lastName && formik.errors.lastName
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Last Name"
            {...formik.getFieldProps("lastName")}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="text-red-700 text-xs mt-1">
              {formik.errors.lastName}
            </div>
          ) : null}
        </div>

        {/* email */}
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
            placeholder="name@example.com"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-700 text-xs mt-1">
              {formik.errors.email}
            </div>
          ) : null}
        </div>

        {/* password */}
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

        {/* button */}
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
            Submit
          </button>
        </div>
      </form>

      {/* login link */}
      <div className="text-sm flex flex-row gap-1">
        <div>Already have an account?</div>
        <Link
          href="/login"
          className="font-semibold text-[#6C41FF] no-underline"
        >
          Log in here
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
