import BasicCartStructure from "@/components/BasicCartStructure";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";

const Console = () => {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <Navbar />
      <div className=" border bg-blue-300 m-5 p-5 rounded-md">
        <h1 className="text-center text-[2rem] font-bold mb-5">
          Today&#39;s Report
        </h1>
        <div className="flex flex-wrap gap-4 md:gap-10 justify-center items-center">
          {/* ATTENDENCE REPORT  */}
          <BasicCartStructure>
            <p className="font-bold text-center mb-5 text-[1.2rem]">
              Attendence Report
            </p>
            <div className="flex flex-col gap-4">
              {arr.map((ele, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border p-4 rounded-md bg-slate-300"
                >
                  <div className="flex justify-center items-center gap-3">
                    <div>
                      <Image
                        src={"/dummy.jpeg"}
                        width={70}
                        height={70}
                        className="rounded-full"
                        alt="Avatar"
                      />
                    </div>
                    <div>
                      <p>Rajendra Patel</p>
                      <p>Software Engineer</p>
                    </div>
                  </div>
                  <div>
                    <p>TimeIn - 23:23 PM</p>
                    <p>TimeOut - 24:23PM</p>
                  </div>
                </div>
              ))}
            </div>
          </BasicCartStructure>
          {/* EMPLOYEE ON LEAVE */}
          <BasicCartStructure>
            <p className="font-bold text-center mb-5 text-[1.2rem]">
              Employee on Leave
            </p>
            <div className="flex flex-col gap-5">
              {arr.map((ele, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border p-4 rounded-md bg-slate-300"
                >
                  <div className="flex justify-center items-center gap-3">
                    <div>
                      <Image
                        src={"/dummy.jpeg"}
                        width={70}
                        height={70}
                        className="rounded-full"
                        alt="Avatar"
                      />
                    </div>
                    <div>
                      <p>Rajendra Patel</p>
                      <p>Software Engineer</p>
                    </div>
                  </div>
                  <div className=" w-1/2 flex flex-col gap-2">
                    <p className="bg-red-500 text-white rounded-full p-2">
                      23 April 2024 - 24 April 2025
                    </p>
                    <p className="text-center bg-green-600 rounded-sm p-2 text-white">
                      Wedding At home and I have to attend it.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </BasicCartStructure>
          {/* MESSAGE */}
          <BasicCartStructure>
            <p className="font-bold text-center mb-5 text-[1.2rem]">Messages</p>
            <div className="flex flex-col gap-5">
              {arr.map((ele, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border p-4 rounded-md bg-slate-300"
                >
                  <div className="flex justify-center items-center gap-3">
                    <div>
                      <Image
                        src={"/dummy.jpeg"}
                        width={70}
                        height={70}
                        className="rounded-full"
                        alt="Avatar"
                      />
                    </div>
                    <div>
                      <p>Rajendra Patel</p>
                      <p>Software Engineer</p>
                    </div>
                  </div>
                  <div className=" w-1/2 ">
                    <p className="text-center bg-green-600 rounded-sm p-2 text-white">
                      Wedding At home and I have to attend it.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </BasicCartStructure>
          {/* ANNOUCEMENTS */}
          <BasicCartStructure>
            <p className="font-bold text-center mb-5 text-[1.2rem]">
              Annoucements
            </p>
            <div className="flex flex-col gap-5">
              {arr.map((ele, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border p-4 rounded-md bg-slate-300"
                >
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Ratione animi atque tempora perspiciatis consequatur ipsum
                    voluptas harum odio libero unde.
                  </p>
                  <button
                    className="border
                    min-h-full
                    p-2
                    rounded-full
                    bg-red-800
                    text-white

                  "
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </BasicCartStructure>
        </div>
      </div>
    </>
  );
};

export default Console;
