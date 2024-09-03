"use client";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface localStorageValue {
  id: string;
}

interface IApplication {
  fullName: string;
  leaveType: string;
  reason: string;
  startingDate: string;
  endingDate: string;
  leaveStatus: string;
}

const Leave_Application = () => {
  const [applicationData, setApplicationData] = useState<IApplication[]>();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("Employee_Info");
      if (storedData) {
        const employeeInfo: localStorageValue = JSON.parse(storedData);
        axios
          .get(`/api/leave-applications/application/${employeeInfo.id}`)
          .then((res) => {
            setApplicationData(res.data.responseBody);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, []);
  return (
    <>
      <ProtectedRoute allowedRoles={["Employee", "Manager"]}>
        <Navbar />
        <main className=" flex mt-2 flex-col items-center  justify-center gap-4 p-2 ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 font-bold text-red-900 text-lg">
                  S.no
                </TableHead>
                <TableHead className="w-32 font-bold text-red-900 text-lg">
                  From
                </TableHead>
                <TableHead className="w-32 font-bold text-red-900 text-lg">
                  To
                </TableHead>
                <TableHead className="w-64 font-bold text-red-900 text-lg">
                  Reason
                </TableHead>
                <TableHead className="w-32 font-bold text-red-900 text-lg">
                  Leave Type
                </TableHead>
                <TableHead className="w-32 font-bold text-red-900 text-lg">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicationData?.length === 0 ? (
                <></>
              ) : (
                <>
                  {applicationData?.map((ele, i) => {
                    const startingDate = ele.startingDate.split("T")[0];
                    const endingDate = ele.endingDate.split("T")[0];
                    return (
                      <TableRow key={i}>
                        <TableCell className="w-10">{i + 1}</TableCell>
                        <TableCell className="w-32">{startingDate}</TableCell>
                        <TableCell className="w-32">{endingDate}</TableCell>
                        <TableCell className="w-64">{ele.reason}</TableCell>
                        <TableCell className="w-32">{ele.leaveType}</TableCell>
                        <TableCell className="w-32">
                          {ele.leaveStatus}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </>
              )}
            </TableBody>
          </Table>
        </main>
      </ProtectedRoute>
    </>
  );
};

export default Leave_Application;
