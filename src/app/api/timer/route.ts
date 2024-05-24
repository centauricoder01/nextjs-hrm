import { connect } from "@/db/db";
import { NextResponse } from "next/server";
import Timer from "@/model/timer.model";

export async function POST(request: Request) {
  try {
    await connect();
    const body = await request.json();
    const { userId, action } = body;

    const today = new Date().toISOString().slice(0, 10);

    let timer = await Timer.findOne({
      userId: userId,
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
          const startTime = Date.now();
          timer = await Timer.create({
            userId,
            date: today,
            startTime,
            elapsedTime: 0,
            workingHourStatus: false,
          });
          return NextResponse.json({
            success: true,
            message: "started",
            responseBody: null,
          });
        }

      case "stop":
        if (timer && timer.startTime) {
          const elapsedTime =
            timer.elapsedTime + (Date.now() - timer.startTime);
          timer.elapsedTime = elapsedTime;
          timer.startTime = null;
          timer.workingHourStatus = elapsedTime >= 7.75 * 60 * 60 * 1000;
          await timer.save();
          return NextResponse.json({
            success: true,
            message: "stopped",
            responseBody: elapsedTime,
          });
        }
        return NextResponse.json({
          success: false,
          message: "No timer to stop",
          responseBody: null,
        });

      case "resume":
        if (timer && !timer.startTime) {
          timer.startTime = Date.now();
          await timer.save();
          return NextResponse.json({
            success: true,
            message: "resumed",
            responseBody: null,
          });
        }
        return NextResponse.json({
          success: false,
          message: "No timer to resume",
          responseBody: null,
        });

      case "get-time":
        const storedElapsedTime = timer?.elapsedTime || 0;
        const currentTime = timer?.startTime
          ? storedElapsedTime + (Date.now() - timer.startTime)
          : storedElapsedTime;
        const workingHourStatus = currentTime >= 7.75 * 60 * 60 * 1000;
        return NextResponse.json({
          success: true,
          message: "Your Current Time",
          responseBody: {
            currentTime,
            workingHourStatus,
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
