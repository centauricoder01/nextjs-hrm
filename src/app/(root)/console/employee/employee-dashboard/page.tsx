"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IAttendence } from "@/types/modals.types";
import Image from "next/image";

interface LocalStorageValue {
  _id: string;
}

const fetchTime = async (
  userId: string
): Promise<{ currentTime: number; isOnBreak: boolean }> => {
  const response = await fetch("/api/timer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "get-time", userId }),
  });
  const data = await response.json();
  return data.responseBody;
};

const Employee_Dashboard = () => {
  const [leaveData, setLeaveData] = useState<number[] | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [attendenceReport, setAttendenceReport] = useState<
    IAttendence[] | null
  >(null);

  // FOR LEAVE DATA THAT IS COMING FROM TEH BACKEND
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("Employee_Info");
      if (storedData) {
        const employeeInfo: LocalStorageValue = JSON.parse(storedData);
        setUserId(employeeInfo._id);
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

  useEffect(() => {
    if (userId) {
      axios
        .get(`/api/attendence/${userId}`)
        .then((res) => {
          setAttendenceReport(res.data.responseBody);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);

  console.log(attendenceReport, "attendenceReport");

  return (
    <>
      <Navbar />
      <div className="bg-[#89deff] m-5 p-5 rounded-md">
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
          <div className="border bg-white min-h-[1000px] max-h-[1000px] p-5 w-[100%] overflow-y-scroll overflow-x-hidden rounded-sm">
            <h1 className="font-bold text-[2rem]">Attendence Details</h1>
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>S.no</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>TimeIn</TableHead>
                    <TableHead>TimeOut</TableHead>
                    <TableHead>TimeIn Selfie</TableHead>
                    <TableHead>TimeIn Location</TableHead>
                    <TableHead>Timeout Location</TableHead>
                    <TableHead>TimeOut Selfie</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendenceReport?.length !== 0
                    ? attendenceReport?.map((ele, i) => (
                        <TableRow key={i}>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell>{ele.name}</TableCell>
                          <TableCell>{ele.date}</TableCell>
                          <TableCell>
                            {ele.timeIn === null ? (
                              <b className="text-red-600">Not Time In</b>
                            ) : (
                              ele.timeIn
                            )}
                          </TableCell>
                          <TableCell>
                            {ele.timeOut === null ? (
                              <b className="text-red-600">Not Time Out</b>
                            ) : (
                              ele.timeOut
                            )}
                          </TableCell>
                          <TableCell>
                            {ele.timeInSelfie === null ? (
                              <b className="text-red-600">Not Time In</b>
                            ) : (
                              <Image
                                src={ele.timeInSelfie}
                                width={250}
                                height={250}
                                className="rounded-sm"
                                alt="Avatar"
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            {ele.timeInLocation === null ? (
                              <b className="text-red-600">Not Time In</b>
                            ) : (
                              ele.timeInLocation
                            )}
                          </TableCell>
                          <TableCell>
                            {ele.timeOutSelfie === null ? (
                              <b className="text-red-600">Not Time Out</b>
                            ) : (
                              <Image
                                src={ele.timeOutSelfie}
                                width={250}
                                height={250}
                                className="rounded-sm"
                                alt="Avatar"
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            {ele.timeOutLocation === null ? (
                              <b className="text-red-600">Not Time Out</b>
                            ) : (
                              ele.timeOutLocation
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Employee_Dashboard;
