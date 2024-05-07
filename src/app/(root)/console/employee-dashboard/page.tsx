import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React from "react";

const Employee_Dashboard = () => {
  const arr = [1, 2, 3, 4, 5];
  return (
    <>
      <Navbar />
      <div className="bg-[#89deff] m-5 p-5 rounded-md">
        <div className=" flex justify-between items-center gap-5">
          <div className="border-gray-100	bg-white p-4 rounded-sm shadow-xl w-1/4">
            <p className="font-bold text-[1.5rem]">Total Leaves</p>
            <p className="text-blue-700 font-bold text-[1.2rem]">12</p>
          </div>
          <div className="border-gray-100	bg-white p-4 rounded-sm shadow-xl w-1/4">
            <p className="font-bold text-[1.5rem]">Leaves Taken</p>
            <p className="text-blue-700 font-bold text-[1.2rem]">3</p>
          </div>
          <div className="border-gray-100	bg-white p-4 rounded-sm shadow-xl w-1/4">
            <p className="font-bold text-[1.5rem]">Leave Left </p>
            <p className="text-blue-800 font-bold text-[1.2rem]">9</p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-5 rounded-md mt-10 ">
          <div className="border bg-white p-5 h-96 w-[48%] overflow-y-scroll overflow-x-hidden rounded-sm">
            <h1 className="font-bold ">Notification</h1>
            {arr.map((e) => (
              <div className="mt-2 shadow-lg p-2 rounded-sm" key={e}>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                  praesentium vero atque natus repellendus beatae repellat
                  consequuntur iure alias reprehenderit?
                </p>
                <div className="flex justify-between mt-5">
                  <p>HR-Admin</p>
                  <p>12 May 2024</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-5 h-96 w-[48%] overflow-y-scroll overflow-x-hidden rounded-sm">
            <h1 className="font-bold">Messages</h1>
            {arr.map((e) => (
              <div key={e} className="mt-5 shadow-lg p-2 rounded-sm">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Repudiandae obcaecati quis excepturi quisquam eveniet
                  expedita, modi commodi suscipit aut accusantium.
                </p>
                <div className="flex justify-between mt-5">
                  <p>HR-Admin</p>
                  <div>
                    <Button>Reply</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Employee_Dashboard;
