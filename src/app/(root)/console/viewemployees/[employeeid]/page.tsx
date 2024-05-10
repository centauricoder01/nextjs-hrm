"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { IEmployee } from "@/types/modals.types";

const SingleEmployee = () => {
  const { employeeid } = useParams<{ employeeid: string }>();
  const [SingleEmployeeInfo, setSingleEmployeeInfo] = useState<IEmployee>();

  useEffect(() => {
    axios
      .get(`/api/employees/${employeeid}`)
      .then((res) => {
        setSingleEmployeeInfo(res.data.responseBody);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [employeeid]);

  if (!SingleEmployeeInfo) {
    return <h1>Loading... </h1>;
  }
  const birthDate = new Date(SingleEmployeeInfo?.birthDate);
  const joiningDate = new Date(SingleEmployeeInfo?.joinDate);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <>
      <Navbar />
      <div className=" bg-[#c3eeff] m-5 p-5 rounded-md flex justify-center items-center flex-col">
        <Image
          src={SingleEmployeeInfo.profileImage}
          width={100}
          height={100}
          className="rounded-full mb-2"
          alt="Avatar"
        />
        <div className="flex flex-wrap justify-center items-center gap-2">
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            EmployeeId -{" "}
            <span className="font-bold">{SingleEmployeeInfo?.employeeId} </span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Name -{" "}
            <span className="font-bold">{SingleEmployeeInfo?.fullName}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Gender -{" "}
            <span className="font-bold">{SingleEmployeeInfo?.gender}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Birth Date -{" "}
            <span className="font-bold">
              {birthDate.toLocaleDateString("en-US", options)}
            </span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Marital Status -{" "}
            <span className="font-bold">
              {SingleEmployeeInfo?.maritalStatus}
            </span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Mobile Number -{" "}
            <span className="font-bold">
              {SingleEmployeeInfo?.mobileNumber}
            </span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Address -{" "}
            <span className="font-bold">{SingleEmployeeInfo?.fullAddress}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Joining Date -{" "}
            <span className="font-bold">
              {joiningDate.toLocaleDateString("en-US", options)}
            </span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Leave Date -{" "}
            <span className="font-bold">{SingleEmployeeInfo?.leaveDate}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Reave For Leave -{" "}
            <span className="font-bold">
              {SingleEmployeeInfo?.reasonForExit}
            </span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Department -{" "}
            <span className="font-bold">{SingleEmployeeInfo?.department}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Degisnation -{" "}
            <span className="font-bold">{SingleEmployeeInfo?.designation}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Email -{" "}
            <span className="font-bold">{SingleEmployeeInfo?.email}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            password - <span className="font-bold">null</span>
          </p>
        </div>

        {/* <h1>Bank Details </h1> */}

        <h1 className="font-bold text-left m-5 text-[1.5rem]">
          Bank Details and other Info.
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-2">
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            BANK ACCOUNT NUMBER -{" "}
            <span className="font-bold">
              {SingleEmployeeInfo?.bankAccountNumber}
            </span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            BANK IFSC CODE -{" "}
            <span className="font-bold">
              {SingleEmployeeInfo?.bankIFSCCode}
            </span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            BANK NAME -
            <span className="font-bold">{SingleEmployeeInfo?.bankName}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            PAN -
            <span className="font-bold">{SingleEmployeeInfo?.panNumber}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            AADHAR NO -
            <span className="font-bold">
              {SingleEmployeeInfo?.aadharNumber}
            </span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            STATE - <span className="font-bold">MADHYA PRADESH</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            EMERGENCY CONTACT NO -{" "}
            <span className="font-bold">
              {SingleEmployeeInfo?.emergencyContactNumber}
            </span>
          </p>
        </div>
        <h1 className="font-bold text-left m-5 text-[1.5rem]">
          Aadhaar and Pan Image.
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-5">
          <div className="text-center border-2 border-black rounded-sm">
            <p>Personal Aadhaar card</p>
            <Image
              src={SingleEmployeeInfo?.aadhaarImage}
              alt="Aadhaar Image"
              width={300}
              height={150}
              className="rounded-sm"
            />
          </div>
          <div className="text-center border-2 border-black rounded-sm">
            <p>Personal Pancard</p>
            <Image
              src={SingleEmployeeInfo?.pancardImage}
              alt="pan Image"
              width={300}
              height={150}
              className="rounded-sm"
            />
          </div>
          <div className="text-center border-2 border-black rounded-sm">
            <p>Relative Aadhaar Card</p>
            <Image
              src={SingleEmployeeInfo?.relativeAadhaarImage}
              alt="relateive Image"
              width={300}
              height={150}
              className="rounded-sm"
            />
          </div>
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
