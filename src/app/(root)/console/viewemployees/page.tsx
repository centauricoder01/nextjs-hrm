import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// PAGINATION LINK START FROM HERE
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ViewEmployees = () => {
  const arr = [1, 2, 3, 4, 5, 6, 76, 8, 9, 0];
  return (
    <>
      <Navbar />
      <div className=" bg-[#c3eeff] m-5 p-5 rounded-md">
        <div className="sm:text-left text-center">
          <h1 className="font-bold mb-5 text-[2rem]">All Employees (65)</h1>
        </div>

        <div className="flex justify-between items-center gap-5">
          <Input
            className="w-full mb-5 mt-5 bg-white"
            placeholder="Search Empoloyee"
          />
          <button className="border bg-green-800 rounded-lg shadow-slate-500 text-white p-2.5 hover:bg-green-600">
            Search
          </button>
        </div>
        {arr.map((ele, i) => (
          <div
            key={i}
            className="border flex flex-col justify-between sm:flex-row items-center p-2 rounded-md bg-white shadow-2xl mb-4"
          >
            <Image
              src={"/dummy.jpeg"}
              width={70}
              height={70}
              className="rounded-full mb-2"
              alt="Avatar"
            />

            <p className="font-bold mb-2">Rajendra Patel</p>
            <p className="font-bold mb-2">Software Engineer</p>
            <p className="font-bold mb-2">PE10164</p>
            <Link href={"/console/singlemployee"} passHref>
              <p className="font-bold text-blue-500 hover:underline">
                View Full Detail
              </p>
            </Link>
          </div>
        ))}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" className="text-white" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="text-white">
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis className="text-white" />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" className="text-white" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default ViewEmployees;
