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

    return NextResponse.json(
      {
        success: true,
        message: `Leave Detail of the Employee.`,
        responseBody: findLeaveDataById,
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

// Define generateStaticParams function
// export async function generateStaticParams() {
//   // Connect to the database
//   await connect();

//   // Fetch all employee IDs to generate static paths
//   const leaves = await leaveDataModel.find({}, "userId").exec();
//   return leaves.map((leave) => ({
//     employeeid: leave.userId.toString(),
//   }));
// }
