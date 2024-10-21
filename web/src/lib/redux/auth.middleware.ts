import { Dispatch } from "@reduxjs/toolkit";
import { createAxiosInstance, createData } from "../axios";
import axios, { AxiosError } from "axios";
import { login } from "./user.slice";
import { User, UserLoginPayload } from "@/types/user";
import { deleteCookie, getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const userLogin = ({ email, password }: UserLoginPayload) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await createData(
        "api",
        "users/v2",
        { email, password },
        "application/json"
      );

      if (response.data.success) {
        const { data } = response.data;

        const access_token = getCookie("access-token") || "";

        if (access_token) {
          const user: User = jwtDecode(access_token);
          dispatch(login(user));
        }

        return { role: data.role, message: response.data.message };
      } else {
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: response.data.message || "An unexpected error occurred.",
          confirmButtonText: "Try Again",
        });
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data.message || "An unexpected error occurred.";

        Swal.fire({
          icon: "error",
          title: "Login error",
          text: errorMessage,
          confirmButtonText: "Try again",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Unexpected error",
          text: "An unexpected error occurred.",
          confirmButtonText: "Try again",
        });
      }
    }
  };
};

export const keepLogin = () => {
  return async (dispatch: Dispatch) => {
    const token = getCookie("access_token");
    if (token) {
      try {
        dispatch(login(jwtDecode(token)));
      } catch (error) {
        console.error("Error decoding token:", error);
        deleteCookie("access_token");
      }
    } else {
      deleteCookie("access_token");
    }
  };
};
