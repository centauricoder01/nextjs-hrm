import { connect } from "@/db/db";
import { NextResponse } from "next/server";
import leaveApplicationModel from "@/model/leave-application.model";

interface Params {
  employeeid: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    await connect();
    const id = params.employeeid;
    const findLeaveApplicationsById = await leaveApplicationModel.find({
      userId: id,
    });

    if (!findLeaveApplicationsById) {
      return NextResponse.json(
        {
          success: true,
          message:
            "Please Provide Correct EmployeeID Or Leave Application is Not Available",
          responseBody: null,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Application Detail of the Employee.`,
        responseBody: findLeaveApplicationsById,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in the Leave Application response:", error);
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
