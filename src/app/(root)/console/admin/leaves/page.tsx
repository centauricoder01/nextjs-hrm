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

interface ILeaveApplication {
  userId: IUser; // Reference to IUser interface
  leaveType: string;
  reason: string;
  startingDate: string;
  endingDate: string;
  leaveStatus: string;
  _id: string;
}

const Leaves = () => {
  const [leaveApplication, setLeaveApplication] =
    useState<ILeaveApplication[]>();

  useEffect(() => {
    fetchLeaveApplications();
  }, []);

  const fetchLeaveApplications = () => {
    axios
      .get("/api/leave-applications")
      .then((res) => {
        setLeaveApplication(res.data.responseBody);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateLeaveStatus = (id: string, leaveStatus: string) => {
    const body = { id, leaveStatus };
    axios
      .patch("/api/leave-applications", body)
      .then((res) => {
        if (res.status === 200) {
          setLeaveApplication((prevLeaveApplications) =>
            prevLeaveApplications?.map((leaveApplication) =>
              leaveApplication._id === id
                ? { ...leaveApplication, leaveStatus }
                : leaveApplication
            )
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#c3eeff] m-5 p-5 rounded-md">
        <div className="sm:text-left text-center">
          <h1 className="font-bold mb-5 text-[2rem]">Leaves Requests</h1>
        </div>
        <div>
          {!leaveApplication ? (
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
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveApplication.map((ele, i) => {
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
                      <TableCell>{ele.leaveType}</TableCell>
                      <TableCell>{ele.leaveStatus}</TableCell>
                      <TableCell className="text-center">
                        {ele.leaveStatus === "Pending" ? (
                          <>
                            <Button
                              className="mr-3 bg-orange-700"
                              onClick={() =>
                                updateLeaveStatus(ele._id, "Approved")
                              }
                            >
                              Approve
                            </Button>
                            <Button
                              className="mr-3 bg-green-700"
                              onClick={() =>
                                updateLeaveStatus(ele._id, "Rejected")
                              }
                            >
                              Reject
                            </Button>
                          </>
                        ) : (
                          <Button className="mr-3 bg-black text-white">
                            No Action Needed
                          </Button>
                        )}
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
