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
          await Timer.create({
            userId,
            date: today,
            startTime,
            captureStart: Date.now(),
          });
        }
        return NextResponse.json({
          success: true,
          message: "started",
          responseBody: null,
        });
      case "break":
        if (timer && timer.startTime) {
          const breakTime = Date.now();
          const changeElapsedTime =
            timer.elapsedTime + (Date.now() - timer.startTime);
          timer.elapsedTime = changeElapsedTime;
          timer.startTime = 0;
          timer.elapsedTime = changeElapsedTime;
          timer.breaks.push({ start: breakTime });
          timer.isOnBreak = true;
          await timer.save();
          return NextResponse.json({
            success: true,
            message: "Break Has been added",
            responseBody: null,
          });
        }
        return NextResponse.json({
          success: false,
          message: "No Timer to break",
          responseBody: null,
        });
      case "continue":
        if (timer && !timer.startTime) {
          const continueTime = Date.now();
          for (let i = 0; i < timer.breaks.length; i++) {
            if (timer.breaks[i].end === 0) {
              timer.breaks[i].end = continueTime;
              break;
            }
          }
          timer.startTime = Date.now();
          timer.isOnBreak = false;
          await timer.save();
          return NextResponse.json({
            success: true,
            message: "Timer Has been Continued",
            responseBody: null,
          });
        }
        return NextResponse.json({
          success: false,
          message: "No Timer to Continue",
          responseBody: null,
        });
      case "stop":
        if (timer && timer.startTime) {
          timer.captureEnd = Date.now();
          const changeElapsedTime =
            timer.elapsedTime + (Date.now() - timer.startTime);
          timer.elapsedTime = changeElapsedTime;
          timer.startTime = 0;
          timer.elapsedTime = changeElapsedTime;
          timer.isOnBreak = true;
          timer.save();
          return NextResponse.json({
            success: true,
            message: "Timer Has been stopped",
            responseBody: null,
          });
        }
        return NextResponse.json({
          success: false,
          message: "No Timer to Stop",
          responseBody: null,
        });
      case "get-time":
        const storedElapsedTime = timer?.elapsedTime || 0;
        const currentTime = timer?.startTime
          ? storedElapsedTime + (Date.now() - timer.startTime)
          : storedElapsedTime;
        return NextResponse.json({
          success: true,
          message: "Your Current Time",
          responseBody: {
            currentTime,
            isOnBreak: timer?.isOnBreak,
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
