"use client";
import { RiMenuAddFill } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import { TfiDashboard } from "react-icons/tfi";
import { FcLeave } from "react-icons/fc";
import { MdOutlineMessage } from "react-icons/md";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";
import { RiPresentationFill } from "react-icons/ri";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-start items-center gap-10 bg-blue-500 p-5 text-[1.5rem]">
        <Sheet>
          <SheetTrigger>
            <RiMenuAddFill fontSize={40} color="white" />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle className="mb-5">HRM</SheetTitle>
              {/* MAIN CONTENT START FROM HERE  */}
              <Link href={"/console"}>
                <p className="flex justify-start items-center gap-2">
                  <TfiDashboard size={20} />
                  Dashboard
                </p>
              </Link>
              <hr />
              <Link href={"/console/attendence"}>
                <p className="flex justify-start items-center gap-2">
                  <RiPresentationFill size={20} />
                  Attendence
                </p>
              </Link>
              <hr />
              <Link href={"/console/addemployee"}>
                <p className="flex justify-start items-center gap-2 ">
                  <IoPerson size={20} />
                  Add Employee
                </p>
              </Link>
              <hr />
              <Link href={"/console/viewemployees"}>
                <p className="flex justify-start items-center gap-2 ">
                  <FaUsersViewfinder size={20} />
                  View Employee
                </p>
              </Link>
              <hr />
              <Link href={"/console/leaves"}>
                <p className="flex justify-start items-center gap-2">
                  <FcLeave size={20} />
                  Leave Request
                </p>
              </Link>
              <hr />
              <Link href={"/console/messages"}>
                <p className="flex justify-start items-center gap-2">
                  <MdOutlineMessage size={20} />
                  Messages
                </p>
              </Link>
              <hr />
              {/* <p className="flex justify-start items-center gap-2">
                <MdOutlinePayments size={20} />
                Payslip
              </p>
              <hr /> */}
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <h1 className="text-white">PlanEdu HRM</h1>
      </div>
    </div>
  );
};

export default Navbar;
