import { connect } from "@/db/db";
import EmployeeModel from "@/model/employee.model";
import { NextResponse } from "next/server";

interface Params {
  employeeid: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  // Connect to the database
  await connect();
  try {
    const id = params.employeeid;

    const getAttendenceById = await EmployeeModel.find({ userId: id });

    if (!getAttendenceById) {
      return NextResponse.json(
        {
          success: false,
          message: "Please Provide Correct Employee ID",
          responseBody: null,
        },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "We got you the Employee Profile",
        responseBody: getAttendenceById,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error came in the Singel Employee response:", error);
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
