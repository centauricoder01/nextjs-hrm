import { connect } from "@/db/db";
import AttendenceModel from "@/model/attendence.model";
import EmployeeModel from "@/model/employee.model";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Connect to the database
  await connect();
  try {
    const todayDate = new Date().toISOString().split("T")[0];
    console.log(todayDate);

    const getAttendenceByDate = await AttendenceModel.find({
      date: todayDate,
    });

    return NextResponse.json(
      {
        success: true,
        message: "We got you All Attendence",
        responseBody: getAttendenceByDate.length,
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
