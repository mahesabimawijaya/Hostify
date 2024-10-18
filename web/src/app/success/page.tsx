import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h2 className="text-2xl mb-2">
        Payment <span className="text-green-600">Success</span>
      </h2>
      <h2 className="text-4xl font-semibold mb-20">
        THANK YOU FOR USING OUR SERVICE
      </h2>
      <Link href={"http://localhost:3000"} className="hover:underline text-lg">
        Back to Home
      </Link>
    </div>
  );
};

export default page;
