"use client";
import BasicCartStructure from "@/components/BasicCartStructure";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface IUser {
  profileImage: string;
  fullName: string;
  designation: string;
}

interface ILeaveApplication {
  userId: IUser; // Reference to IUser interface
  leaveType: string;
  reason: string;
  startingDate: string;
  endingDate: string;
  leaveStatus: string;
  _id: string;
}

const Console = () => {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [leaveApplication, setLeaveApplication] =
    useState<ILeaveApplication[]>();

  useEffect(() => {
    axios
      .get("/api/leave-applications")
      .then((res) => {
        const filteredLeaveAppliation = res.data.responseBody.filter(
          (application: ILeaveApplication) =>
            application.leaveStatus === "Approved"
        );
        setLeaveApplication(filteredLeaveAppliation);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />

      <div className="  bg-[#c3eeff] m-5 p-5 rounded-md">
        <h1 className="text-left text-[3rem] font-bold mb-5">Overview</h1>
        <div className="flex flex-wrap gap-4 justify-start items-center mb-4">
          <div className="w-[30%] bg-white shadow-[0_0_36px_-3px_#00000026] rounded-sm p-3">
            <h1 className="font-bold text-[1.2rem] text-green-800">
              Total Employees
            </h1>
            <p className="font-bold text-[1.1rem]">65</p>
          </div>
          <div className="w-[30%] bg-white shadow-[0_0_36px_-3px_#00000026] rounded-sm p-3">
            <h1 className="font-bold text-[1.2rem] text-red-800">
              Employees on Leave
            </h1>
            <p className="font-bold text-[1.1rem]">
              {leaveApplication?.length}
            </p>
          </div>
          <div className="w-[30%] bg-white shadow-[0_0_36px_-3px_#00000026] rounded-sm p-3">
            <h1 className="font-bold text-[1.2rem] text-blue-800">
              Today&apos;s Attendence
            </h1>
            <p className="font-bold text-[1.1rem]">60</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 md:gap-10 justify-center items-center">
          {/* EMPLOYEE ON LEAVE */}

          {leaveApplication?.length === undefined ? (
            <LoadingSpinner />
          ) : (
            <BasicCartStructure>
              <p className="font-bold text-left mb-5 text-[1.2rem] text-red-800">
                Employee on Leave
              </p>
              <div className="flex flex-col gap-5">
                {leaveApplication.map((ele, i) => {
                  const startingDate = ele.startingDate.split("T")[0];
                  const endingDate = ele.endingDate.split("T")[0];
                  return (
                    <div
                      key={i}
                      className="flex justify-between items-center p-4 rounded-md bg-slate-300"
                    >
                      <div className="flex justify-center items-center gap-3">
                        <div>
                          <Image
                            src={ele.userId.profileImage}
                            width={70}
                            height={70}
                            className="rounded-full"
                            alt="Avatar"
                          />
                        </div>
                        <div>
                          <p>{ele.userId.fullName}</p>
                          <p>{ele.userId.designation}</p>
                        </div>
                      </div>
                      <div className=" w-1/2 flex flex-col gap-2">
                        <p className="bg-red-500 text-center text-white rounded-full p-2">
                          {startingDate} - {endingDate}
                        </p>
                        <p className="text-center bg-green-600 rounded-sm p-2 text-white">
                          {ele.reason}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </BasicCartStructure>
          )}

       
        </div>
      </div>
    </>
  );
};

export default Console;
