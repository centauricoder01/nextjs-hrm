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

  const [filteredAttendence, setFilteredAttendence] = useState<
    IAttendence[] | null
  >(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dateFilter, setDateFilter] = useState<string>("");

  const recordsPerPage = 2;

  // Modigy the image path
  const modifyImagePath = (path: string) => {
    const modifiedPath = path.replace(/\\/g, "/");
    const trimmedPath = modifiedPath.split("/public")[1];
    return trimmedPath;
  };

  // calculate the total hours
  const calculateHoursWorked = (timeIn: string, timeOut: string) => {
    // Parse the time strings into Date objects
    const timeInDate = new Date(`01/01/2000 ${timeIn}`);
    const timeOutDate = new Date(`01/01/2000 ${timeOut}`);

    // Calculate the difference in milliseconds
    const timeDifference = timeOutDate.getTime() - timeInDate.getTime();

    // Convert the difference to hours
    const hoursWorked = timeDifference / (1000 * 60 * 60);

    return hoursWorked;
  };

  // FOR LEAVE DATA THAT IS COMING FROM THE BACKEND
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
          setFilteredAttendence(res.data.responseBody); // Initialize with all data
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);

  // Handle Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Calculate the number of pages
  const totalPages = attendenceReport
    ? Math.ceil(attendenceReport.length / recordsPerPage)
    : 0;

  // Filtered and paginated data
  const currentRecords = filteredAttendence
    ? filteredAttendence.slice(indexOfFirstRecord, indexOfLastRecord)
    : [];

  // Handle page change
  const handlePageChange = (direction: string) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Handle Date Filter
  const handleDateFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    setDateFilter(selectedDate);

    if (attendenceReport) {
      const filtered = attendenceReport.filter(
        (record) => record.date === selectedDate
      );
      setFilteredAttendence(filtered);
      setCurrentPage(1); // Reset to the first page when filter changes
    }
  };

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
                  <TableHead className="w-[1000px]">S.no</TableHead>
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

        <div className="flex justify-between items-center gap-5 rounded-md mt-10">
          <div className="border bg-white min-h-[1000px] max-h-[1000px] p-5 w-[100%] overflow-y-scroll overflow-x-hidden rounded-sm">
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-bold text-[2rem]">Attendence Details</h1>

              {/* Date Filter */}
              <div className="bg-slate-300 w-[30%] flex justify-between items-center p-2 rounded">
                <label className="mr-2 text-black font-extrabold">
                  Filter by Date:
                </label>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={handleDateFilter}
                  className="border rounded p-1"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table className="min-w-[1500px]">
                {" "}
                {/* Increase the min-width for a larger table */}
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[50px]">S.no</TableHead>
                    <TableHead className="min-w-[150px]">Name</TableHead>
                    <TableHead className="min-w-[150px]">Date</TableHead>
                    <TableHead className="min-w-[120px]">TimeIn</TableHead>
                    <TableHead className="min-w-[120px]">TimeOut</TableHead>
                    <TableHead className="min-w-[200px]">
                      TimeIn Selfie
                    </TableHead>
                    <TableHead className="min-w-[200px]">
                      TimeIn Location
                    </TableHead>
                    <TableHead className="min-w-[200px]">
                      TimeOut Selfie
                    </TableHead>
                    <TableHead className="min-w-[200px]">
                      Timeout Location
                    </TableHead>
                    <TableHead className="min-w-[200px]">Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentRecords?.length !== 0 ? (
                    currentRecords.map((ele, i) => (
                      <TableRow key={i}>
                        <TableCell>{indexOfFirstRecord + i + 1}</TableCell>
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
                            <img
                              src={modifyImagePath(ele.timeInSelfie)}
                              width={250}
                              height={150}
                              className="rounded-sm h-[7rem] w-[10rem]"
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
                            <img
                              src={modifyImagePath(ele.timeOutSelfie)}
                              width={250}
                              height={150}
                              className="rounded-sm h-[7rem] w-[10rem]"
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
                        <TableCell>
                          {ele.timeOut === null ? (
                            <p className="font-extrabold text-red-700">
                              Not Logout
                            </p>
                          ) : calculateHoursWorked(ele.timeIn, ele.timeOut) >=
                            9 ? (
                            <p className="text-green-500">Completed 9 hours</p>
                          ) : (
                            <p className="text-red-500 font-extrabold">
                              Not complete 9 hours
                            </p>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center">
                        No records found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-4 border items-center p-2 bg-slate-400 rounded">
              <button
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 1}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-900"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-900"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Employee_Dashboard;
