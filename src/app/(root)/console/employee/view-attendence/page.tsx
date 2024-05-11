"use client";
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
import Image from "next/image";

interface attendenceBluePrint {
  date: string;
  name: string;
  employeId: string;
  timeIn: string;
  timeOut: string;
  timeInSelfie: string;
  timeOutSelfie: string;
  timeInLocation: string;
  timeOutLocation: string;
}

interface EmployeeInfo {
  _id: string;
}

const View_Attendence = () => {
  const [localStorageValue, setLocalStorageValue] =
    useState<EmployeeInfo | null>(null);
  const [getAttendence, setGetAttendence] = useState<attendenceBluePrint[]>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getRole = JSON.parse(localStorage.getItem("Employee_Info") || "");
      setLocalStorageValue(getRole);
    }
  }, []);

  useEffect(() => {
    if (localStorageValue && localStorageValue._id) {
      axios
        .get(`/api/attendence/${localStorageValue._id}`)
        .then((res) => {
          setGetAttendence(res.data.responseBody);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [localStorageValue]);

  return (
    <>
      <Navbar />

      <h1 className="font-bold text-[1.4rem] w-[90%] m-auto border mt-10">
        Attendence Report
      </h1>
      <div className="w-[90%] m-auto border-lg mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.no</TableHead>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[100px]">EmployeeId</TableHead>
              <TableHead className="w-[100px]">TimeIn</TableHead>
              <TableHead>TimeIn Location</TableHead>
              <TableHead>TimeIn Selfie</TableHead>
              <TableHead className="w-[100px]">TimeOut</TableHead>
              <TableHead>TimeOut Location</TableHead>
              <TableHead>TimeOut Selfie</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getAttendence?.map((ele, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{ele.date}</TableCell>
                <TableCell>{ele.name}</TableCell>
                <TableCell>{ele.employeId}</TableCell>
                <TableCell>{ele.timeIn}</TableCell>
                <TableCell>{ele.timeInLocation}</TableCell>
                <TableCell>
                  <Image
                    src={ele.timeInSelfie}
                    alt="Image"
                    width={50}
                    height={50}
                  />
                </TableCell>
                <TableCell>{ele.timeOut}</TableCell>
                <TableCell>{ele.timeOutLocation}</TableCell>
                <TableCell>
                  <Image
                    src={ele.timeOutSelfie}
                    alt="Image"
                    width={50}
                    height={50}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default View_Attendence;
