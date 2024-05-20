"use client";
import DonutChart from "@/components/DonutChart";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface localStorageValue {
  _id: string;
}

const Employee_Dashboard = () => {
  const arr = [1, 2, 3, 4, 5];
  const [leaveData, setLeaveData] = useState<number[] | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("Employee_Info");
      if (storedData) {
        const employeeInfo: localStorageValue = JSON.parse(storedData);
        axios
          .get(`/api/leave-applications/${employeeInfo._id}`)
          .then((res) => {
            const val = [
              res.data.responseBody.remainingSickLeave,
              res.data.responseBody.remainingCausalLeave,
              res.data.responseBody.remainingCompensateLeave,
              res.data.responseBody.remainingHalfdayLeave,
              res.data.responseBody.remainingPrivilegeLeave,
              res.data.responseBody.remainingQuarterLeave,
            ];

            setLeaveData(val);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-[#89deff] m-5 p-5 rounded-md">
        {/* CHART IMPLEMENTATION START FROM HERE  */}
        <div className="flex justify-between items-center gap-10 w-full bg-white mt-10 p-5 rounded">
          <div className="w-2/5">
            <h1 className="text-[2rem] font-bold">Total Leaves</h1>
            <DonutChart
              label={[
                "Sick Leave",
                "Causal Leave",
                "Compensate leave",
                "Half-Day Leave",
                "Privilage Leave",
                "Quater Leave",
              ]}
              numberData={[6, 12, 12, 5, 15, 3]}
            />
          </div>
          <div className="w-2/5">
            <h1 className="text-[2rem] font-bold">Leaves Left</h1>
            <DonutChart
              label={[
                "Sick Leave",
                "Causal Leave",
                "Compensate leave",
                "Half-Day Leave",
                "Privilage Leave",
                "Quater Leave",
              ]}
              numberData={
                leaveData === null ? [6, 12, 12, 5, 15, 3] : leaveData
              }
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-5 rounded-md mt-10 ">
          <div className="border bg-white p-5 h-96 w-[100%] overflow-y-scroll overflow-x-hidden rounded-sm">
            <h1 className="font-bold ">Notification</h1>
            {arr.map((e) => (
              <div className="mt-2 shadow-lg p-2 rounded-sm" key={e}>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                  praesentium vero atque natus repellendus beatae repellat
                  consequuntur iure alias reprehenderit?
                </p>
                <div className="flex justify-between mt-5">
                  <p>HR-Admin</p>
                  <p>12 May 2024</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Employee_Dashboard;
