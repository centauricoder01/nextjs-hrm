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

interface showTimerData {
  date: Date;
  startTime: Date;
  endTime: Date;
  elapsedTime: number;
  userId: {
    fullName: string;
  };
  breaks: {
    start: number;
    end: number;
  }[];
}

const fetchTime = async (
  userId: string
): Promise<{ currentTime: number; isOnBreak: boolean }> => {
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
  const [workingStatus, setWorkingStatus] = useState<boolean>(false);
  const [timerData, setTimerData] = useState<showTimerData[]>([]);

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
        const { currentTime, isOnBreak } = await fetchTime(userId);
        setTime(currentTime);
        setRunning(currentTime > 0 && !workingStatus); // Ensure the timer is set to running if it's supposed to be
        setWorkingStatus(isOnBreak);
      }
    };

    initializeTimer();
  }, [userId, workingStatus]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    const updateElapsedTime = async () => {
      try {
        if (userId) {
          const { currentTime, isOnBreak } = await fetchTime(userId);
          setTime(currentTime);
          setWorkingStatus(isOnBreak);
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

  useEffect(() => {
    axios
      .get(`/api/timer/${userId}`)
      .then((res) => {
        setTimerData(res.data.responseBody);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

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
        body: JSON.stringify({ action: "break", userId }),
      });
      const data = await response.json();
      console.log(data, "This is Data");

      if (data.success) {
        setRunning(false);
        setWorkingStatus(data.responseBody >= 7.75 * 60 * 60 * 1000);
      }
    }
  };

  const handleResume = async () => {
    if (userId) {
      const response = await fetch("/api/timer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "continue", userId }),
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
              Break
            </button>
          ) : time > 0 && !running ? (
            <button
              onClick={handleResume}
              className="border p-2 rounded bg-green-400"
            >
              Continue
            </button>
          ) : null}
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
          <div className="border bg-white min-h-[1000px] max-h-[1000px] p-5 w-[100%] overflow-y-scroll overflow-x-hidden rounded-sm">
            <h1 className="font-bold text-[2rem]">Timer Details</h1>
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>S.no</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Total Break</TableHead>
                    <TableHead>Working Hours</TableHead>
                    <TableHead>Breaks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timerData?.length > 0
                    ? timerData.map((ele, i) => {
                        let changeDate = new Date(ele.date)
                          .toISOString()
                          .slice(0, 10);
                        let changeStartTime = new Date()
                          .toLocaleTimeString()
                          .slice(0, 8);
                        let changeEndTime = new Date()
                          .toLocaleTimeString()
                          .slice(0, 8);
                        let totalTime = new Date(ele.elapsedTime)
                          .toISOString()
                          .substr(11, 8);

                        return (
                          <TableRow key={i}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{ele.userId.fullName}</TableCell>
                            <TableCell>{changeDate}</TableCell>
                            <TableCell>{changeStartTime}</TableCell>
                            <TableCell>{changeEndTime}</TableCell>
                            <TableCell>{ele.breaks.length}</TableCell>
                            <TableCell>{totalTime}</TableCell>
                            <TableCell>
                              {ele.breaks.map((ele, i) => {
                                const options: Intl.DateTimeFormatOptions = {
                                  hour: "2-digit" as "2-digit",
                                  minute: "2-digit" as "2-digit",
                                  second: "2-digit" as "2-digit",
                                  timeZone: "Asia/Kolkata",
                                };

                                const breakStartTime = new Date(
                                  ele.start
                                ).toLocaleTimeString("en-IN", options);
                                const breakEndTime = new Date(
                                  ele.end
                                ).toLocaleTimeString("en-IN", options);

                                return (
                                  <p key={i}>
                                    Start Time - {breakStartTime} &#160; &#160;
                                    End Time - {breakEndTime}
                                  </p>
                                );
                              })}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : null}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Employee_Dashboard;
