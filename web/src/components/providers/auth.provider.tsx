"use client";
import { keepLogin } from "@/lib/redux/auth.middleware";
import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks";

export default function AuthProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  const fetchUser = async () => await dispatch(keepLogin());

  useEffect(() => {
    fetchUser();
  }, []);

  return children;
}
