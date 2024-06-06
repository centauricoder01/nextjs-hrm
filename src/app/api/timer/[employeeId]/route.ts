import { connect } from "@/db/db";
import { NextResponse } from "next/server";
import Timer from "@/model/timer.model";

interface Params {
  employeeId: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    await connect();
    const id = params.employeeId;

    const findTimerById = await Timer.find({ userId: id }).populate({
      path: "userId",
      select: "fullName profileImage designation",
    });

    const filteredLeaveApplications = findTimerById.filter(
      (timer) => timer.userId !== null
    );
    if (!filteredLeaveApplications) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please Provide Correct EmployeeID Or Timer is Not Available",
          responseBody: null,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Timer Details of the Employee.`,
        responseBody: findTimerById,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in the Timer response for GET:", error);
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

export async function generateStaticParams() {
  // Connect to the database
  await connect();

  // Fetch all employee IDs to generate static paths
  const timers = await Timer.find({}, "userId").exec();
  return timers.map((timer) => ({
    employeeid: timer.userId.toString(),
  }));
}
