import { connect } from "@/db/db";
import leaveDataModel from "@/model/leave-data.model";
import { NextResponse } from "next/server";
import { ILeaveData } from "@/types/modals.types";

interface Params {
  employeeid: string;
}

export async function POST(request: Request) {
  await connect();
  try {
    const body = await request.json();
    const findLeaveDataById = await leaveDataModel.findOne({
      userId: body.id,
    });

    if (!findLeaveDataById) {
      const addEmployeeLeaveDetails = new leaveDataModel({ userId: body.id });
      await addEmployeeLeaveDetails.save();
      return NextResponse.json(
        {
          success: true,
          message: "Employee Leave Data Table Created",
          responseBody: null,
        },
        { status: 200 }
      );
    }

    // Here we are decreasing the leave of the Employees

    const getLeaveTypeOfEmployee = body.leaveType;

    // Create a mapping of leave type strings to the corresponding field names
    const leaveTypeFieldMap: { [key: string]: keyof ILeaveData } = {
      "Compensate Leave": "remainingCompensateLeave",
      "Sick Leave": "remainingSickLeave",
      "Causal Leave": "remainingCausalLeave",
      "Privilege Leave": "remainingPrivilegeLeave",
      "Halfday Leave": "remainingHalfdayLeave",
      "Quarter Leave": "remainingQuarterLeave",
    };

    const leaveField = leaveTypeFieldMap[getLeaveTypeOfEmployee];

    if (leaveField && findLeaveDataById[leaveField] > 0) {
      // Decrement the leave by one
      // Cast to any to bypass TypeScript error and then to number
      const leaveData = findLeaveDataById.toObject() as any;

      // Decrement the leave by one
      leaveData[leaveField] = (leaveData[leaveField] as number) - 1;

      await findLeaveDataById.updateOne({
        [leaveField]: leaveData[leaveField],
      });

      return NextResponse.json(
        {
          success: true,
          message: `${getLeaveTypeOfEmployee} has been decremented by one.`,
          responseBody: findLeaveDataById,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: `No sufficient leave balance for ${getLeaveTypeOfEmployee}.`,
        responseBody: null,
      },
      { status: 400 }
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
          success: false,
          message: "Please Provide Correct EmployeeID",
          responseBody: null,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Attendence Detail of the Employee.`,
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
