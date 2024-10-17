import { Dispatch } from "@reduxjs/toolkit";
import { createAxiosInstance, createData } from "../axios";
import axios, { AxiosError } from "axios";
import { login } from "./user.slice";
import { User, UserLoginPayload } from "@/types/user";
import { deleteCookie, getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export const userLogin = ({ email, password }: UserLoginPayload) => {
  return async (dispatch: Dispatch) => {
    try {
      const api = createAxiosInstance("api");
      const response = await api.post(
        "users/login",
        { email, password },
        { withCredentials: true }
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
        toast.error(response.data.message || "An unexpected error occurred.");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data.message || "An unexpected error occurred.";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
};

// export const keepLogin = () => {
//   return async (dispatch: Dispatch) => {
//     try {
//       const token = getCookie("access_token");
//       if (token) {
//         dispatch(login(jwtDecode(token)));
//       }
//     } catch (err: any) {
//       deleteCookie("access_token");
//     }
//   };
// };

export const keepLogin = () => {
  return async (dispatch: Dispatch) => {
    const token = getCookie("access_token"); // Ensure the cookie name matches what you set
    if (token) {
      try {
        // Dispatch the login action with the decoded user information
        dispatch(login(jwtDecode(token)));
      } catch (error) {
        console.error("Error decoding token:", error);
        deleteCookie("access_token"); // Clean up if there's an issue
      }
    } else {
      deleteCookie("access_token"); // Clean up if no token is found
    }
  };
};
