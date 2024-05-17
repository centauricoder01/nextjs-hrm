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

interface IUser {
  profileImage: string;
  fullName: string;
}

interface IleaveApplication {
  userId: IUser; // Reference to IUser interface
  leaveType: string;
  reason: string;
  startingDate: string;
  endingDate: string;
  leaveStatus: string;
}

const Leaves = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const [leaveApplication, setLeaveApplication] =
    useState<IleaveApplication[]>();

  useEffect(() => {
    axios
      .get("/api/leave-applications")
      .then((res) => {
        setLeaveApplication(res.data.responseBody);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-[#c3eeff] m-5 p-5 rounded-md">
        <div className="sm:text-left text-center">
          <h1 className="font-bold mb-5 text-[2rem]">Leaves Requests</h1>
        </div>
        <div>
          {leaveApplication?.length === 0 ? (
            <LoadingSpinner />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveApplication?.map((ele, i) => {
                  // Extract the date parts
                  const startingDate = ele.startingDate.split("T")[0];
                  const endingDate = ele.endingDate.split("T")[0];

                  return (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        <Image
                          src={ele.userId.profileImage}
                          width={70}
                          height={70}
                          className="rounded-full mb-2"
                          alt="Avatar"
                        />
                      </TableCell>
                      <TableCell>{ele.userId.fullName}</TableCell>
                      <TableCell>{startingDate}</TableCell>
                      <TableCell>{endingDate}</TableCell>
                      <TableCell>{ele.reason}</TableCell>
                      <TableCell>{ele.leaveStatus}</TableCell>
                      <TableCell className="text-center">
                        <Button className="mr-3 bg-orange-700">Approve</Button>
                        <Button className="mr-3 bg-green-700">Reject</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </>
  );
};

export default Leaves;
