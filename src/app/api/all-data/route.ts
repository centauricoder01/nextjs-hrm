import { connect } from "@/db/db";
import EmployeeModel from "@/model/employee.model";
import { NextResponse } from "next/server";
import AttendenceModel from "@/model/attendence.model";

export async function GET(request: Request) {
  await connect();
  try {
    const totalEmployee = await EmployeeModel.find();
    const todayDate = new Date().toISOString().split("T")[0];
    const totalAttendence = await AttendenceModel.find({
      date: {
        $regex: `^${todayDate}`, // Matches any timestamp on this day
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "All Data Fetched Successfully",
        responseBody: {
          totalEmployee: totalEmployee.length,
          totalAttendence: totalAttendence.length,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error || "An error occurred",
        responseBody: null,
      },
      { status: 500 }
    );
  }
}
