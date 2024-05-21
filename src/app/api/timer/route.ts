import { connect } from "@/db/db";
import { NextResponse } from "next/server";

let startTime: number | null = null;
let elapsedTime = 0;
export async function POST(request: Request, response: Response) {
  try {
    await connect();
    const body = await request.json();

    switch (body.action) {
      case "start":
        startTime = Date.now();
        elapsedTime = 0;
        NextResponse.json(
          {
            success: true,
            message: "started",
            responseBody: null,
          },
          { status: 200 }
        );
        break;

      case "stop":
        if (startTime !== null) {
          elapsedTime += Date.now() - startTime;
          startTime = null;
        }
        NextResponse.json(
          {
            success: true,
            message: "stopped",
            responseBody: null,
          },
          { status: 200 }
        );

        break;

      case "resume":
        if (startTime === null) {
          startTime = Date.now();
        }
        NextResponse.json(
          {
            success: true,
            message: "resumed",
            responseBody: null,
          },
          { status: 200 }
        );
        break;

      case "get-time":
        const currentTime =
          startTime !== null
            ? elapsedTime + (Date.now() - startTime)
            : elapsedTime;
        NextResponse.json(
          {
            success: true,
            message: "Your Current Time",
            responseBody: currentTime,
          },
          { status: 200 }
        );

        break;

      default:
        NextResponse.json(
          {
            success: false,
            message: "Invalid action",
            responseBody: null,
          },
          { status: 400 }
        );
        break;
    }
  } catch (error) {
    console.error("Error came in the Timer response:", error);
    return Response.json(
      {
        success: false,
        message: error,
        responseBody: null,
      },
      { status: 500 }
    );
  }
}
