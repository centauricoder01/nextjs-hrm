import DonutChart from "@/components/DonutChart";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React from "react";

const Employee_Dashboard = () => {
  const arr = [1, 2, 3, 4, 5];
  return (
    <>
      <Navbar />

      <div className="bg-[#89deff] m-5 p-5 rounded-md">
        {/* CHART IMPLEMENTATION START FROM HERE  */}
        <div className="flex justify-between items-center gap-10 w-full bg-white mt-10 p-5 rounded">
          <div className="w-2/5">
            <h1 className="text-[2rem] font-bold">Total Leaves</h1>
            <DonutChart
              label={[
                "Sick Leave",
                "Causal Leave",
                "Privilage Leave",
                "Half-Day Leave",
                "Quater Leave",
                "Compensate leave",
              ]}
              numberData={[6, 12, 2, 4, 5, 3]}
            />
          </div>
          <div className="w-2/5">
            <h1 className="text-[2rem] font-bold">Leaves Left</h1>
            <DonutChart
              label={[
                "Sick Leave",
                "Causal Leave",
                "Privilage Leave",
                "Half-Day Leave",
                "Quater Leave",
                "Compensate leave",
              ]}
              numberData={[4, 5, 1, 4, 1, 2]}
            />
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
