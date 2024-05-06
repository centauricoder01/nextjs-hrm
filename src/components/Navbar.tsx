"use client";
import { RiMenuAddFill } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import { TfiDashboard } from "react-icons/tfi";
import { FcLeave } from "react-icons/fc";
import { IoMdTimer, IoIosHome } from "react-icons/io";
import {
  MdOutlineMessage,
  MdOutlineCollections,
  MdTimeToLeave,
} from "react-icons/md";
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

const Navbar = () => {
  const [userValue, setUserValue] = useState<IEmployee>();
  const [imageSource, setImageSource] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    const getRole = JSON.parse(localStorage.getItem("Employee_Info") || "");
    setUserValue(getRole);
    setImageSource(getRole.profileImage);
  }, []);

  if (userValue) {
    // router.push("/dashboard");
  }
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
                      Leave Requests
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
                </SheetHeader>
              ) : (
                <SheetHeader>
                  <SheetTitle className="mb-5">HRM</SheetTitle>
                  <Link href={"/console/employee-dashboard"}>
                    <p className="flex justify-start items-center gap-2 ">
                      <IoIosHome size={20} />
                      Home
                    </p>
                  </Link>
                  <hr />
                  <Link href={"/console/profile"}>
                    <p className="flex justify-start items-center gap-2">
                      <MdOutlineCollections size={20} />
                      Profile
                    </p>
                  </Link>
                  <hr />
                  <Link href={"/console/leave-application"}>
                    <p className="flex justify-start items-center gap-2">
                      <MdTimeToLeave size={20} />
                      Leave Application
                    </p>
                  </Link>
                  <hr />

                  <Link href={"/console/view-attendence"}>
                    <p className="flex justify-start items-center gap-2 ">
                      <IoMdTimer size={20} />
                      View Attendence
                    </p>
                  </Link>
                  <hr />
                  <Link href={"/console/send-message"}>
                    <p className="flex justify-start items-center gap-2 ">
                      <FaMessage size={20} />
                      Send Message
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
              height={50}
              className="rounded-full"
            />
          )}

          <p className="text-white">{userValue?.fullName}</p>
          <Button
            onClick={() => {
              localStorage.removeItem("Employee_Info");
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
