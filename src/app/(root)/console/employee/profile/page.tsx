"use client";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { IEmployee } from "@/types/modals.types";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userValue, setUserValue] = useState<IEmployee>();
  const [imageSource, setImageSource] = useState<string>();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("Employee_Info");
      axios
        .get("/api/employees/employeeid")
        .then((res) => {
          setUserValue({
            ...res.data.responseBody,
            birthDate: res.data.responseBody.birthDate
              ? new Date(res.data.responseBody.birthDate).toLocaleDateString()
              : "",
            joinDate: res.data.responseBody.joinDate
              ? new Date(res.data.responseBody.joinDate).toLocaleDateString()
              : "undefined",
            leaveDate: res.data.responseBody.leaveDate
              ? new Date(res.data.responseBody.leaveDate).toLocaleDateString()
              : "undefined",
          });
        })
        .catch((err) => {
          console.log(err);
        });

      if (storedData) {
        const employeeInfo: IEmployee = JSON.parse(storedData);
        setImageSource(employeeInfo.profileImage);
      }
    }
  }, []);

  return (
    <>
      <ProtectedRoute allowedRoles={["Employee", "Manager"]}>
        <Navbar />
        <div className=" bg-[#c3eeff] m-5 p-5 rounded-md flex justify-center items-center flex-col">
          {imageSource && (
            <Image
              src={imageSource}
              width={100}
              height={100}
              className="rounded-full mb-2"
              alt="Avatar"
            />
          )}

          <div className="flex flex-wrap justify-center items-center gap-2">
            <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
              EmployeeId -{" "}
              <span className="font-bold">{userValue?.employeeId} </span>
            </p>
            <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
              Name - <span className="font-bold">{userValue?.fullName}</span>
            </p>
            <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
              Gender - <span className="font-bold">{userValue?.gender}</span>
            </p>
            <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
              Birth Date -{" "}
              <span className="font-bold">{userValue?.birthDate}</span>
            </p>
            <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
              Marital Status -{" "}
              <span className="font-bold">{userValue?.maritalStatus}</span>
            </p>
            <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
              Mobile Number -{" "}
              <span className="font-bold">{userValue?.mobileNumber}</span>
            </p>
            <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
              Address -{" "}
              <span className="font-bold">{userValue?.fullAddress}</span>
            </p>
            <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
              Joining Date -{" "}
              <span className="font-bold">{userValue?.joinDate}</span>
            </p>

            {userValue?.employeeExited ? (
              <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                Leave Date -{" "}
                <span className="font-bold">{userValue?.leaveDate}</span>
              </p>
            ) : null}

            {userValue?.reasonForExit ? (
              <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                Reave For Leave -{" "}
                <span className="font-bold">{userValue?.reasonForExit}</span>
              </p>
            ) : null}

            <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
              Department -{" "}
              <span className="font-bold">{userValue?.department}</span>
            </p>
            <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
              Degisnation -{" "}
              <span className="font-bold">{userValue?.designation}</span>
            </p>
            <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
              Email - <span className="font-bold">{userValue?.email}</span>
            </p>

            {/* <h1>Bank Details </h1> */}
            <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
              BANK ACCOUNT NUMBER -{" "}
              <span className="font-bold">{userValue?.bankAccountNumber}</span>
            </p>
            <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
              BANK IFSC CODE -{" "}
              <span className="font-bold">{userValue?.bankIFSCCode}</span>
            </p>
            <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
              BANK NAME -
              <span className="font-bold">{userValue?.bankName}</span>
            </p>
            <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
              PAN -<span className="font-bold">{userValue?.panNumber}</span>
            </p>
            <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
              AADHAR NO -
              <span className="font-bold">
                {" "}
                {userValue?.aadharNumber !== undefined
                  ? userValue.aadharNumber.toString()
                  : "Not Provided"}
              </span>
            </p>
            <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
              STATE - <span className="font-bold">{userValue?.state}</span>
            </p>
            <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
              EMERGENCY CONTACT NO -{" "}
              <span className="font-bold">
                {userValue?.emergencyContactNumber}
              </span>
            </p>
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default Profile;
