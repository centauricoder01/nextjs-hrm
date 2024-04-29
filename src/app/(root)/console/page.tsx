import BasicCartStructure from "@/components/BasicCartStructure";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";

const Console = () => {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <Navbar />
      <div className="  bg-[#c3eeff] m-5 p-5 rounded-md">
        <h1 className="text-left text-[3rem] font-bold mb-5">Overview</h1>
        <div className="flex flex-wrap gap-4 justify-start items-center mb-4">
          <div className="w-[30%] bg-white shadow-[0_0_36px_-3px_#00000026] rounded-sm p-3">
            <h1 className="font-bold text-[1.2rem] text-green-800">
              Total Employees
            </h1>
            <p className="font-bold text-[1.1rem]">65</p>
          </div>
          <div className="w-[30%] bg-white shadow-[0_0_36px_-3px_#00000026] rounded-sm p-3">
            <h1 className="font-bold text-[1.2rem] text-red-800">
              Employees on Leave
            </h1>
            <p className="font-bold text-[1.1rem]">5</p>
          </div>
          <div className="w-[30%] bg-white shadow-[0_0_36px_-3px_#00000026] rounded-sm p-3">
            <h1 className="font-bold text-[1.2rem] text-blue-800">
              Today&apos;s Attendence
            </h1>
            <p className="font-bold text-[1.1rem]">60</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 md:gap-10 justify-center items-center">
          {/* EMPLOYEE ON LEAVE */}
          <BasicCartStructure>
            <p className="font-bold text-left mb-5 text-[1.2rem] text-red-800">
              Employee on Leave
            </p>
            <div className="flex flex-col gap-5">
              {arr.map((ele, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 rounded-md bg-slate-300"
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
                    <p className="bg-red-500 text-center text-white rounded-full p-2">
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
          {/* ANNOUCEMENTS  */}
          <BasicCartStructure>
            <p className="font-bold text-left mb-5 text-[1.3rem] text-yellow-300 shadow-2xl">
              Annoucements
            </p>
            <div className="flex flex-col gap-5">
              {arr.map((ele, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 rounded-md bg-slate-300"
                >
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Ratione animi atque tempora perspiciatis consequatur ipsum
                    voluptas harum odio libero unde.
                  </p>
                  <button
                    className="
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
