import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Attendence = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <>
      <Navbar />
      <div className="bg-[#c3eeff] m-5 p-5 rounded-md">
        <div className="sm:text-left text-center">
          <h1 className="font-bold mb-5 text-[2rem]">
            Today&apos;s Attendence
          </h1>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>EmployeeId</TableHead>
                <TableHead>Selfie</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Time In</TableHead>
                <TableHead>Time Out</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {arr.map((ele, i) => (
                <TableRow key={i}>
                  <TableCell>29 April 2024</TableCell>
                  <TableCell>Rajendra Patel</TableCell>
                  <TableCell>PE10164</TableCell>
                  <TableCell>
                    <Image
                      src={"/dummy.jpeg"}
                      width={70}
                      height={70}
                      className="rounded-sm"
                      alt="Avatar"
                    />
                  </TableCell>
                  <TableCell>Jabalpur, Madhya Pradesh</TableCell>
                  <TableCell>09:34 AM</TableCell>
                  <TableCell>06:44 PM</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Attendence;
