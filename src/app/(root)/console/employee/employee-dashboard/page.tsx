"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LocalStorageValue {
  _id: string;
}

const fetchTime = async (
  userId: string
): Promise<{ currentTime: number; workingHourStatus: boolean }> => {
  const response = await fetch("/api/timer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "get-time", userId }),
  });
  const data = await response.json();
  return data.responseBody;
};

const Employee_Dashboard = () => {
  const [leaveData, setLeaveData] = useState<number[] | null>(null);
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [workingHourStatus, setWorkingHourStatus] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("Employee_Info");
      if (storedData) {
        const employeeInfo: LocalStorageValue = JSON.parse(storedData);
        setUserId(employeeInfo._id);
        axios
          .get(`/api/leave-applications/${employeeInfo._id}`)
          .then((res) => {
            const val = [
              res.data.responseBody.remainingSickLeave,
              res.data.responseBody.remainingCausalLeave,
              res.data.responseBody.remainingCompensateLeave,
              res.data.responseBody.remainingHalfdayLeave,
              res.data.responseBody.remainingPrivilegeLeave,
              res.data.responseBody.remainingQuarterLeave,
            ];
            setLeaveData(val);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, []);

  useEffect(() => {
    const initializeTimer = async () => {
      if (userId) {
        const { currentTime, workingHourStatus } = await fetchTime(userId);
        setTime(currentTime);
        setRunning(currentTime > 0 && !workingHourStatus); // Ensure the timer is set to running if it's supposed to be
        setWorkingHourStatus(workingHourStatus);
      }
    };

    initializeTimer();
  }, [userId]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    const updateElapsedTime = async () => {
      try {
        if (userId) {
          const { currentTime, workingHourStatus } = await fetchTime(userId);
          setTime(currentTime);
          setWorkingHourStatus(workingHourStatus);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (running) {
      interval = setInterval(updateElapsedTime, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [running, userId]);

  const handleStart = async () => {
    if (userId) {
      const response = await fetch("/api/timer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "start", userId }),
      });
      const data = await response.json();
      console.log(data, "This is Data");

      if (data.success) {
        setRunning(true);
        setTime(0); // Reset time when starting
      }
    }
  };

  const handleStop = async () => {
    if (userId) {
      const response = await fetch("/api/timer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "stop", userId }),
      });
      const data = await response.json();
      console.log(data, "This is Data");

      if (data.success) {
        setRunning(false);
        setWorkingHourStatus(data.responseBody >= 7.75 * 60 * 60 * 1000);
      }
    }
  };

  const handleResume = async () => {
    if (userId) {
      const response = await fetch("/api/timer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "resume", userId }),
      });
      const data = await response.json();
      console.log(data, "This is Data");
      if (data.success) {
        setRunning(true);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#89deff] m-5 p-5 rounded-md">
        <div className="flex justify-between items-center gap-10 w-full bg-white mt-10 p-5 rounded">
          <h1 className="text-[2rem] font-bold">Timer of Today</h1>
          <p className="border rounded p-3 font-bold">
            {time >= 0
              ? new Date(time).toISOString().substr(11, 8)
              : "00:00:00"}
          </p>
          <p className="border rounded p-3 font-bold">
            {workingHourStatus ? "True" : "False"}
          </p>
          {!running && time === 0 ? (
            <button
              onClick={handleStart}
              className="border p-2 rounded bg-green-400"
            >
              Start
            </button>
          ) : running ? (
            <button
              onClick={handleStop}
              className="border p-2 rounded bg-red-400"
            >
              Stop
            </button>
          ) : time > 0 && !running ? (
            <button
              onClick={handleResume}
              className="border p-2 rounded bg-green-400"
            >
              Resume
            </button>
          ) : null}
          {/* <button
            onClick={handleResume}
            className="border p-2 rounded bg-green-400"
          >
            Resume
          </button> */}
        </div>
        <div className="flex justify-between items-center gap-10 w-full bg-white mt-10 p-5 rounded">
          <div>
            <h1 className="text-[2rem] font-bold mb-5">Leave Table</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[1000px] ">S.no</TableHead>
                  <TableHead className="w-[1000px]">Leave Type</TableHead>
                  <TableHead className="w-[1000px]">Total Leave</TableHead>
                  <TableHead className="w-[1000px]">Leave Left</TableHead>
                  <TableHead className="w-[1000px]">Leave Taken</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Sick Leave</TableCell>
                  <TableCell>6</TableCell>
                  <TableCell>
                    {leaveData === null ? null : leaveData[0]}
                  </TableCell>
                  <TableCell>
                    {leaveData === null ? null : 6 - leaveData[0]}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>Causal Leave</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell>
                    {leaveData === null ? null : leaveData[1]}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {leaveData === null ? null : 12 - leaveData[1]}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3</TableCell>
                  <TableCell>Compensate leave</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell>
                    {leaveData === null ? null : leaveData[2]}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {leaveData === null ? null : 12 - leaveData[2]}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>4</TableCell>
                  <TableCell>Half-Day Leave</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>
                    {leaveData === null ? null : leaveData[3]}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {leaveData === null ? null : 5 - leaveData[3]}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>5</TableCell>
                  <TableCell>Privilage Leave</TableCell>
                  <TableCell>15</TableCell>
                  <TableCell>
                    {leaveData === null ? null : leaveData[4]}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {leaveData === null ? null : 15 - leaveData[4]}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>6</TableCell>
                  <TableCell>Quater Leave</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>
                    {leaveData === null ? null : leaveData[5]}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {leaveData === null ? null : 3 - leaveData[5]}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex justify-between items-center gap-5 rounded-md mt-10 ">
          <div className="border bg-white p-5 h-96 w-[100%] overflow-y-scroll overflow-x-hidden rounded-sm">
            <h1 className="font-bold ">Notification</h1>

            <div className="mt-2 shadow-lg p-2 rounded-sm" key={"e"}>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Employee_Dashboard;
