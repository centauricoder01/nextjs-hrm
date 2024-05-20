import { connect } from "@/db/db";
import EmployeeModel from "@/model/employee.model";
import { NextResponse } from "next/server";
import AttendenceModel from "@/model/attendence.model";

export async function GET(request: Request) {
  // Connect to the database
  await connect();
  try {
    const totalEmployee = await EmployeeModel.find();
    const todayDate = new Date().toISOString().split("T")[0];
    const totalAttendence = await AttendenceModel.find({ date: todayDate });
    return NextResponse.json(
      {
        success: false,
        message: "All Data Fetched Successfully",
        responseBody: {
          totalEmployee: totalEmployee.length,
          totalAttendence: totalAttendence.length,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in the all Data response:", error);
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
