"use client";
import DonutChart from "@/components/DonutChart";
import Navbar from "@/components/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
        {/* <div className="flex justify-between items-center gap-10 w-full bg-white mt-10 p-5 rounded">
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
        </div> */}
        <div className="flex justify-between items-center gap-10 w-full bg-white mt-10 p-5 rounded">
          <div>
            <h1 className="text-[2rem] font-bold mb-5">Leave Table</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[1000px] ">S.no</TableHead>
                  <TableHead className="w-[1000px]">Leave Type</TableHead>
                  <TableHead className="w-[1000px]">Total Leave</TableHead>
                  <TableHead className="w-[1000px]">Leave Left</TableHead>
                  <TableHead className="w-[1000px]">Leave Taken</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Sick Leave</TableCell>
                  <TableCell>6</TableCell>
                  <TableCell>
                    {leaveData === null ? null : leaveData[0]}
                  </TableCell>
                  <TableCell>
                    {leaveData === null ? null : 6 - leaveData[0]}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>Causal Leave</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell>
                    {leaveData === null ? null : leaveData[1]}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {leaveData === null ? null : 12 - leaveData[1]}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3</TableCell>
                  <TableCell>Compensate leave</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell>
                    {leaveData === null ? null : leaveData[2]}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {leaveData === null ? null : 12 - leaveData[2]}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>4</TableCell>
                  <TableCell>Half-Day Leave</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>
                    {leaveData === null ? null : leaveData[3]}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {leaveData === null ? null : 5 - leaveData[3]}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>5</TableCell>
                  <TableCell>Privilage Leave</TableCell>
                  <TableCell>15</TableCell>
                  <TableCell>
                    {leaveData === null ? null : leaveData[4]}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {leaveData === null ? null : 15 - leaveData[4]}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>6</TableCell>
                  <TableCell>Quater Leave</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>
                    {leaveData === null ? null : leaveData[5]}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {leaveData === null ? null : 3 - leaveData[5]}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
