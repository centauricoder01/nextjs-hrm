"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useToast } from "@/components/ui/use-toast";

interface Iattendencedata {
  _id: string;
  date: string;
  name: string;
  employeId: string;
  userId: string;
  timeInLocation: string;
  timeOutLocation: string;
  timeInSelfie: string;
  timeOutSelfie: string;
  timeIn: string;
  timeOut: string;
}

const Attendence = () => {
  const [attendenceData, setAttendenceData] = useState<Iattendencedata[]>([]);
  const [originalAttendenceData, setOriginalAttendenceData] = useState<
    Iattendencedata[]
  >([]);
  const [filterName, setFilterName] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleFilterButton = () => {
    if (filterDate === "" && filterName === "") {
      return toast({
        title: "Message",
        description: "Please Enter at least one Filter",
        variant: "destructive",
      });
    }

    const filteredData = originalAttendenceData?.filter((item) => {
      const matchesName = filterName
        ? item.name.toLowerCase().includes(filterName.toLowerCase())
        : true;
      const matchesDate = filterDate ? item.date === filterDate : true;
      return matchesName && matchesDate;
    });

    setAttendenceData(filteredData);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const handleResetButton = () => {
    setFilterName("");
    setFilterDate("");
    setAttendenceData(originalAttendenceData);
    setCurrentPage(1);
  };

  useEffect(() => {
    axios
      .get(`/api/attendence`)
      .then((res) => {
        console.log(res.data.responseBody);
        setAttendenceData(res.data.responseBody);
        setOriginalAttendenceData(res.data.responseBody);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = attendenceData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(attendenceData.length / itemsPerPage);

  return (
    <>
      <Navbar />
      <div className="bg-[#c3eeff] m-5 p-5 rounded-md">
        <div className="sm:text-left text-center">
          <h1 className="font-bold mb-5 text-[2rem]">Attendance Details</h1>
        </div>
        <div className="flex justify-between items-center w-full border p-2 mb-10 bg-white rounded">
          <div className="flex gap-5 items-center w-[30%]">
            <label>Filter by Name</label>
            <input
              type="text"
              placeholder="Name"
              className="bg-blue-300 p-2 rounded w-[68%]"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </div>
          <div className="flex gap-5 items-center w-[30%]">
            <label>Filter by Date</label>
            <input
              type="date"
              className="bg-blue-300 p-2 rounded w-[70%]"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
          <button
            className="w-[20%] bg-blue-700 text-white rounded p-2"
            onClick={handleFilterButton}
          >
            Submit
          </button>
          <button
            className="w-[10%] bg-green-700 text-white rounded p-2"
            onClick={handleResetButton}
          >
            Reset Filter
          </button>
        </div>
        <div>
          {attendenceData.length === 0 ? (
            <p>No Data Available</p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>EmployeeId</TableHead>
                    <TableHead>Time In</TableHead>
                    <TableHead>Time-in Selfie</TableHead>
                    <TableHead>Time-in Location</TableHead>
                    <TableHead>Time Out</TableHead>
                    <TableHead>Time-Out Selfie</TableHead>
                    <TableHead>Time-Out Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((ele, i) => (
                    <TableRow key={i}>
                      <TableCell>{ele.date}</TableCell>
                      <TableCell>{ele.name}</TableCell>
                      <TableCell>{ele.employeId}</TableCell>
                      <TableCell>{ele.timeIn}</TableCell>
                      <TableCell>
                        <Image
                          src={ele.timeInSelfie}
                          width={100}
                          height={100}
                          className="rounded-sm"
                          alt="Avatar"
                        />
                      </TableCell>
                      <TableCell className="w-[20rem]">
                        {ele.timeInLocation}
                      </TableCell>
                      <TableCell>
                        {ele.timeOut === null ? (
                          <p className="font-bold text-red-700">Not Logout</p>
                        ) : (
                          ele.timeOut
                        )}
                      </TableCell>
                      <TableCell>
                        {ele.timeOutSelfie === null ? (
                          <p className="font-bold text-red-700">Not Logout</p>
                        ) : (
                          <Image
                            src={ele.timeOutSelfie}
                            width={100}
                            height={100}
                            className="rounded-sm"
                            alt="Avatar"
                          />
                        )}
                      </TableCell>
                      <TableCell className="w-[20rem]">
                        {ele.timeOutLocation === null ? (
                          <p className="font-bold text-red-700">Not Logout</p>
                        ) : (
                          ele.timeOutLocation
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-center mt-4">
                <button
                  className="px-3 py-1 mx-1 bg-blue-700 text-white rounded"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="px-3 py-1 mx-1">{`${currentPage} of ${totalPages}`}</span>
                <button
                  className="px-3 py-1 mx-1 bg-blue-700 text-white rounded"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Attendence;
