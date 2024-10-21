"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    Swal.fire({
      title: "Payment Success",
      text: "Thank you for using our service",
      icon: "success",
      confirmButtonText: "Back to Home",
      allowOutsideClick: false, // Disable outside click to dismiss the alert
    }).then((result) => {
      if (result.isConfirmed) {
        // Only redirect if the user clicks the confirm button
        router.push("http://localhost:3000");
      }
    });
  }, [router]);

  return <div className="flex flex-col justify-center items-center w-full h-screen"></div>;
};

export default Page;
