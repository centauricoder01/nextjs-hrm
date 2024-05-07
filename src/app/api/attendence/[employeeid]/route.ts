import { connect } from "@/db/db";
import AttendenceModel from "@/model/attendence.model";
import { NextResponse } from "next/server";

interface Params {
  employeeid: string;
}
export async function GET(request: Request, { params }: { params: Params }) {
  // Connect to the database
  await connect();

  try {
    const id = params.employeeid;
    const getAttendenceById = await AttendenceModel.find({ userId: id });
    return NextResponse.json(
      {
        success: true,
        message: "We got you the Employee Attendence",
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
