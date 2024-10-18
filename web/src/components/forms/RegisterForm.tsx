"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/app/hooks";
import "bootstrap/dist/css/bootstrap.min.css";
import { createData } from "@/lib/axios";
import Swal from "sweetalert2";

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
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
      password: Yup.string().required("Password is required"),
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
    }),
    onSubmit: async (values, formikHelpers) => {
      setIsSubmitting(true);
      try {
        const response = await createData(
          "api",
          "users/v1",
          values,
          "application/json"
        );
        console.log(response);

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
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data.message ||
              "An error occurred while signing up."
          );
        } else {
          toast.error("An unexpected error occurred.");
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className=" mx-auto text-center py-20 px-10 gap-4 flex flex-col items-center justify-center ">
      {/* header */}
      <div className="gap-2 flex items-center justify-center flex-col">
        <Link href="/">
          <img src="/hostify.png" alt="" className="w-14" />
        </Link>
        <div className="font-bold text-3xl">Sign up to Hostify</div>
        <div className="text-zinc-400">
          Sign up now and secure your hosting plan!
        </div>
      </div>

      {/* form */}
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-60 lg:w-[500px] "
      >
        <div className="form-floating w-full">
          <input
            type="text"
            className="form-control mb-2"
            id="firstName"
            placeholder="First Name"
            {...formik.getFieldProps("firstName")}
          />
          <label htmlFor="firstName">First Name</label>
        </div>
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="text-red-700 text-xs mb-3">
            {formik.errors.firstName}
          </div>
        ) : null}

        {/* Last Name */}
        <div className="form-floating w-full">
          <input
            type="text"
            className="form-control mb-2"
            id="lastName"
            placeholder="Last Name"
            {...formik.getFieldProps("lastName")}
          />
          <label htmlFor="lastName">Last Name</label>
        </div>
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="text-red-700 text-xs mb-3">
            {formik.errors.lastName}
          </div>
        ) : null}

        <div className="form-floating w-full">
          <input
            type="email"
            className="form-control mb-2"
            id="floatingInput"
            placeholder="name@example.com"
            {...formik.getFieldProps("email")}
            value={formik.values.email || ""}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-700 text-xs mb-3">{formik.errors.email}</div>
        ) : null}

        <div className="form-floating w-full">
          <input
            type="password"
            className="form-control mb-2"
            id="floatingPassword"
            placeholder="•••••••"
            {...formik.getFieldProps("password")}
            value={formik.values.password || ""}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-700 text-xs mb-3">
            {formik.errors.password}
          </div>
        ) : null}

        <div className="mx-auto">
          <button
            className="bg-[#6C41FF] text-white hover:bg-white hover:text-[#6C41FF] border border-primary text-bold uppercase duration-150 w-[154px] h-[52px] rounded"
            disabled={!formik.isValid}
            type="submit"
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
