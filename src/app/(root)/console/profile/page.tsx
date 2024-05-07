"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";

const Profile = () => {
  const getRole = JSON.parse(localStorage.getItem("Employee_Info") || "");
  return (
    <>
      <Navbar />
      <div className=" bg-[#c3eeff] m-5 p-5 rounded-md flex justify-center items-center flex-col">
        <Image
          src={getRole.profileImage}
          width={100}
          height={100}
          className="rounded-full mb-2"
          alt="Avatar"
        />
        <div className="flex flex-wrap justify-center items-center gap-2">
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            EmployeeId -{" "}
            <span className="font-bold">{getRole.employeeId} </span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Name - <span className="font-bold">{getRole.fullName}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Gender - <span className="font-bold">{getRole.gender}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Birth Date - <span className="font-bold">{getRole.birthDate}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Marital Status -{" "}
            <span className="font-bold">
              {getRole.maritalStatus ? "Married" : "Unmarried"}
            </span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Mobile Number -{" "}
            <span className="font-bold">{getRole.mobileNumber}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Address - <span className="font-bold">{getRole.fullAddress}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Joining Date - <span className="font-bold">{getRole.joinDate}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Leave Date -{" "}
            <span className="font-bold">
              {getRole.leaveDate ? getRole.leaveDate : "Null"}
            </span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Reave For Leave -{" "}
            <span className="font-bold">
              {getRole.reasonForExit ? getRole.reasonForExit : "Null"}
            </span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Department - <span className="font-bold">{getRole.department}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Degisnation -{" "}
            <span className="font-bold">{getRole.designation}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            Email - <span className="font-bold">{getRole.email}</span>
          </p>

          {/* <h1>Bank Details </h1> */}
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            BANK ACCOUNT NUMBER -{" "}
            <span className="font-bold">{getRole.bankAccountNumber}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            BANK IFSC CODE -{" "}
            <span className="font-bold">{getRole.bankIFSCCode}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            BANK NAME -<span className="font-bold">{getRole.bankName}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            PAN -<span className="font-bold">{getRole.panNumber}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            AADHAR NO -<span className="font-bold">{getRole.aadharNumber}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            STATE - <span className="font-bold">{getRole.state}</span>
          </p>
          <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
            EMERGENCY CONTACT NO -{" "}
            <span className="font-bold">{getRole.emergencyContactNumber}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Profile;
