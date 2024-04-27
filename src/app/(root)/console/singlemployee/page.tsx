import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const SingleEmployee = () => {
  return (
    <>
      <Navbar />
      <div className=" bg-blue-300 m-5 p-5 rounded-md flex justify-center items-center flex-col">
        <Image
          src={"/dummy.jpeg"}
          width={100}
          height={100}
          className="rounded-full mb-2"
          alt="Avatar"
        />
        <div className="flex flex-wrap justify-center items-center gap-2">
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            EmployeeId - <span className="font-bold">PE10164 </span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Name - <span className="font-bold">Rajendra Patel</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Gender - <span className="font-bold">Male</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Birth Date - <span className="font-bold">01 Oct 2001</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Marital Status - <span className="font-bold">Unmarried</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Mobile Number - <span className="font-bold">7812345678</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Address -{" "}
            <span className="font-bold">Jabalpur, Madhya Pradesh</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Joining Date - <span className="font-bold">11 Sep 2023</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Leave Date - <span className="font-bold">null</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Reave For Leave - <span className="font-bold">null</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Department - <span className="font-bold">IT</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Degisnation - <span className="font-bold">Software Engineer</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Email -{" "}
            <span className="font-bold">rajendrapatelofficial@gmail.com</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            password - <span className="font-bold">rajen@123</span>
          </p>
          {/* <h1>Bank Details </h1> */}
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            BANK ACCOUNT NUMBER -{" "}
            <span className="font-bold">12345678987654321</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            BANK IFSC CODE - <span className="font-bold">SBIN003WG3N</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            BANK NAME -<span className="font-bold">rajendrabankofmars</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            PAN -<span className="font-bold">BGRRR432OE</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            AADHAR NO -<span className="font-bold">123456787654321</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            STATE - <span className="font-bold">MADHYA PRADESH</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            EMERGENCY CONTACT NO - <span className="font-bold">9034234546</span>
          </p>
        </div>
        <div className="flex justify-center items-center gap-5 mt-10">
          <Button className="bg-green-600 hover:bg-green-900 text-white text-[1.2rem] w-40 p-5">
            Edit
          </Button>
          <Button className="bg-red-600 hover:bg-red-900 text-white text-[1.2rem] w-40 p-5">
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default SingleEmployee;
