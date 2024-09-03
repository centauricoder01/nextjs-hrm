"use client";
import { RiMenuAddFill } from "react-icons/ri";
import { IoPerson, IoBookmarks } from "react-icons/io5";
import { TfiDashboard } from "react-icons/tfi";
import { FcLeave } from "react-icons/fc";
import { IoMdTimer, IoIosHome } from "react-icons/io";
import {
  MdOutlinePassword,
  MdOutlineCollections,
  MdTimeToLeave,
} from "react-icons/md";
// import { FcLeave } from "react-icons/fc";

import { FaUsersViewfinder, FaMessage } from "react-icons/fa6";
import { RiPresentationFill } from "react-icons/ri";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { IEmployee } from "@/types/modals.types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

const Navbar = () => {
  const [userValue, setUserValue] = useState<IEmployee>();
  const [imageSource, setImageSource] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getRole = JSON.parse(localStorage.getItem("Employee_Info") || "");
      setUserValue(getRole);
      setImageSource(getRole.profileImage);
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center gap-10 bg-blue-500 p-5">
        <div className="flex justify-start gap-10 items-center text-[1.5rem]">
          <Sheet>
            <SheetTrigger>
              <RiMenuAddFill fontSize={40} color="white" />
            </SheetTrigger>
            <SheetContent side={"left"}>
              {userValue?.role === "Admin" ? (
                <SheetHeader>
                  <SheetTitle className="mb-5">HRM</SheetTitle>
                  <Link href={"/console"}>
                    <p className="flex justify-start items-center gap-2">
                      <TfiDashboard size={20} />
                      Dashboard
                    </p>
                  </Link>
                  <hr />
                  <Link href={"/console/admin/attendence"}>
                    <p className="flex justify-start items-center gap-2">
                      <RiPresentationFill size={20} />
                      Attendence
                    </p>
                  </Link>
                  <hr />
                  <Link href={"/console/admin/addemployee"}>
                    <p className="flex justify-start items-center gap-2 ">
                      <IoPerson size={20} />
                      Add Employee
                    </p>
                  </Link>
                  <hr />
                  <Link href={"/console/admin/viewemployees"}>
                    <p className="flex justify-start items-center gap-2 ">
                      <FaUsersViewfinder size={20} />
                      View Employees
                    </p>
                  </Link>
                  <hr />
                  <Link href={"/console/admin/leaves"}>
                    <p className="flex justify-start items-center gap-2">
                      <FcLeave size={20} />
                      Leave Requests
                    </p>
                  </Link>
                  <hr />
                </SheetHeader>
              ) : (
                <SheetHeader>
                  <SheetTitle className="mb-5">HRM</SheetTitle>
                  <Link href={"/console/employee/employee-dashboard"}>
                    <p className="flex justify-start items-center gap-2 ">
                      <IoIosHome size={20} />
                      Home
                    </p>
                  </Link>
                  <hr />
                  <Link href={"/console/employee/profile"}>
                    <p className="flex justify-start items-center gap-2">
                      <MdOutlineCollections size={20} />
                      Profile
                    </p>
                  </Link>
                  <hr />
                  <Link href={"/console/employee/apply-for-leave"}>
                    <p className="flex justify-start items-center gap-2">
                      <MdTimeToLeave size={20} />
                      Apply for Leave
                    </p>
                  </Link>
                  <hr />
                  <Link href={"/console/employee/leave-application"}>
                    <p className="flex justify-start items-center gap-2">
                      <IoBookmarks size={20} />
                      Leave Applications
                    </p>
                  </Link>
                  <hr />
                  <Link href={"/console/employee/change-password"}>
                    <p className="flex justify-start items-center gap-2">
                      <MdOutlinePassword size={20} />
                      Change Password
                    </p>
                  </Link>
                  <hr />
                </SheetHeader>
              )}
            </SheetContent>
          </Sheet>
          <h1 className="text-white">PlanEdu HRM</h1>
        </div>
        <div className="flex gap-5 items-center">
          {imageSource && (
            <Image
              src={imageSource}
              alt="Profile Image"
              width={50}
              height={0}
              className="rounded-full object-cover object-top border h-[3rem]"
            />
          )}

          <p className="text-white">{userValue?.fullName}</p>
          <Button
            onClick={async () => {
              localStorage.removeItem("Employee_Info");
              await axios.get("/api/logout");
              router.push("/");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
