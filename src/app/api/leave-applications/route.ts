import { connect } from "@/db/db";
import leaveModel from "@/model/leave-application.model";
import leaveDataModel from "@/model/leave-data.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Connect to the database
  await connect();

  try {
    const body = await request.json();

    // *****  CREATING THE LEAVE DATA FOR THE EMPLOYEE  *****
    let findLeaveDataById = await leaveDataModel.findOne({
      userId: body.userId,
    });

    // IF USER DATA DOESN'T EXIST IN THE DATABASE
    if (!findLeaveDataById) {
      findLeaveDataById = new leaveDataModel({
        userId: body.userId,
      });
      await findLeaveDataById.save();
    }

    // Create the leave application
    const leaveApplication = new leaveModel(body);
    await leaveApplication.save();

    // Mapping of leave types to their corresponding fields
    const leaveTypeFieldMap: { [key: string]: keyof typeof findLeaveDataById } =
      {
        "Sick Leave": "remainingSickLeave",
        "Casual Leave": "remainingCausalLeave",
        "Privilege Leave": "remainingPrivilegeLeave",
        "Half-Day Leave": "remainingHalfdayLeave",
        "Quater (1/4) Leave": "remainingQuarterLeave",
        "Compensate leave": "remainingCompensateLeave",
      };

    let leaveWarning = false;
    const leaveField = leaveTypeFieldMap[body.leaveType];

    // Check if the leave type field exists and the remaining leave is greater than 0
    if (leaveField && findLeaveDataById[leaveField] <= 0) {
      leaveWarning = true;
    }

    return NextResponse.json(
      {
        success: true,
        message: leaveWarning
          ? `Warning: You don't have enough ${body.leaveType}, please be careful before applying.`
          : `Leave request has been created successfully.`,
        responseBody: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in the Leave Data response:", error);
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

export async function GET(request: Request) {
  // Connect to the database
  await connect();
  try {
    const AllLeaveApplication = await leaveModel.find().populate({
      path: "userId",
      select: "fullName profileImage",
    });
    return NextResponse.json(
      {
        success: true,
        message: "All Leave Application Fetched Successfully",
        responseBody: AllLeaveApplication,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in the Leave Data response:", error);
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
