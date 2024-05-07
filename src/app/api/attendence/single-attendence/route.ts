import { connect } from "@/db/db";
import AttendenceModel from "@/model/attendence.model";
import EmployeeModel from "@/model/employee.model";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  // Connect to the database
  await connect();

  console.log("YES, I am in Single Attendence");
  try {
    //   const { userId } = await request.json();
    const { params } = context;
    const getAttendenceById = await AttendenceModel.findById({ _id: params });
    return NextResponse.json(
      {
        success: true,
        message: "GET REQUEST SUCCESSFULL",
        responseBody: getAttendenceById,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error came in the Singel attendence response:", error);
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
