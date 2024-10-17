import { Dispatch } from "@reduxjs/toolkit";
import { createAxiosInstance } from "../axios";
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
      // TODO: endpoint BE validate blm ada
      const response = await api.post(
        "api/users/v3",
        { email, password },
        { withCredentials: true }
      );

      const access_token = getCookie("access-token") || "";
      console.log(access_token);

      if (response.data) {
        const { role, url } = response.data;
        console.log("Role from response:", role);

        if (role === "admin") {
          // TODO: handle response
          return;
        }

        if (access_token) {
          const user: User = jwtDecode(access_token);
          dispatch(login(user));
        }

        return { role, url };
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

export const keepLogin = () => {
  return async (dispatch: Dispatch) => {
    try {
      const token = getCookie("access_token");
      if (token) {
        dispatch(login(jwtDecode(token)));
      }
    } catch (err: any) {
      deleteCookie("access_token");
    }
  };
};
