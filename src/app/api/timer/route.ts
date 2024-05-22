import { connect } from "@/db/db";
import { NextResponse } from "next/server";
import Timer from "@/model/timer.model";
import { ObjectId } from "mongoose";

let startTime: number | null = null;
let elapsedTime = 0;

export async function POST(request: Request) {
  try {
    await connect();
    const body = await request.json();
    const { userId, action } = body;

    const today = new Date().toISOString().slice(0, 10);

    // Check if a timer already exists for the user on the current day
    let timer = await Timer.findOne({
      userId: new Object(userId),
      date: today,
    });

    switch (action) {
      case "start":
        if (timer) {
          return NextResponse.json({
            success: false,
            message: "Timer already exists for today",
            responseBody: null,
          });
        } else {
          startTime = Date.now();
          elapsedTime = 0;
          timer = await Timer.create({
            userId: new Object(userId),
            date: today,
            time: elapsedTime.toString(),
            workingHourStatus: true,
          });
          return NextResponse.json({
            success: true,
            message: "started",
            responseBody: null,
          });
        }

      case "stop":
        if (startTime !== null) {
          elapsedTime += Date.now() - startTime;
          startTime = null;
        }
        if (timer) {
          timer.time = elapsedTime.toString();
          timer.workingHourStatus = false;
          await timer.save();
        }
        return NextResponse.json({
          success: true,
          message: "stopped",
          responseBody: elapsedTime,
        });

      case "resume":
        if (startTime === null) {
          startTime = Date.now();
        }
        if (timer) {
          timer.workingHourStatus = true;
          await timer.save();
        }
        return NextResponse.json({
          success: true,
          message: "resumed",
          responseBody: null,
        });

      case "get-time":
        const storedElapsedTime = timer?.time ? parseInt(timer.time, 10) : 0;
        const currentTime =
          startTime !== null
            ? storedElapsedTime + (Date.now() - startTime)
            : storedElapsedTime;
        return NextResponse.json({
          success: true,
          message: "Your Current Time",
          responseBody: {
            currentTime,
            workingHourStatus: timer?.workingHourStatus,
          },
        });

      default:
        return NextResponse.json(
          {
            success: false,
            message: "Invalid action",
            responseBody: null,
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error in Timer response:", error);
    return NextResponse.json(
      {
        success: false,
        message: error,
        responseBody: null,
      },
      { status: 500 }
    );
  }
}
