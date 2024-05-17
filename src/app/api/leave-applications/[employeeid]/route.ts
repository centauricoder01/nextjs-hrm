import { connect } from "@/db/db";
import leaveDataModel from "@/model/leave-data.model";
import { NextResponse } from "next/server";

interface Params {
  employeeid: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    await connect();
    const id = params.employeeid;
    const findLeaveDataById = await leaveDataModel.findOne({
      userId: id,
    });

    if (!findLeaveDataById) {
      return NextResponse.json(
        {
          success: true,
          message:
            "Please Provide Correct EmployeeID Or Leave Data is Not Available",
          responseBody: null,
        },
        { status: 200 }
      );
    }

    // Convert Mongoose document to plain JavaScript object
    const leaveDataObject = findLeaveDataById.toObject();

    const leaveValues = Object.entries(leaveDataObject)
      .filter(
        ([key, value]) =>
          key.startsWith("remaining") && typeof value === "number"
      )
      .map(([key, value]) => value);

    return NextResponse.json(
      {
        success: true,
        message: `Attendance Detail of the Employee.`,
        responseBody: leaveValues,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in the Leave Data response:", error);
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
