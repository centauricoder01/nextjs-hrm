import { connect } from "@/db/db";
import AttendenceModel from "@/model/attendence.model";
import EmployeeModel from "@/model/employee.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Connect to the database
  await connect();
  try {
    const body = await request.json();

    const getAttendenceByDate = await AttendenceModel.find({
      date: body.date,
    });

    return NextResponse.json(
      {
        success: true,
        message: "We got you All Attendence",
        responseBody: getAttendenceByDate,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error came in the attendence by Date response:", error);
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
