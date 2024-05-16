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
    const findLeaveDataById = await leaveDataModel.findOne({
      userId: body.userId,
    });

    // IF USER DATA DOESN'T EXIT IN THE DATABASE
    if (!findLeaveDataById) {
      const addEmployeeLeaveDetails = new leaveDataModel({
        userId: body.userId,
      });
      await addEmployeeLeaveDetails.save();
    }

    const leaveApplication = new leaveModel(body);
    await leaveApplication.save();

    let leaveWarning = false;

    if (
      body.leaveType === "Sick Leave" &&
      findLeaveDataById?.remainingSickLeave <= 0
    ) {
      leaveWarning = true;
    } else if (
      body.leaveType === "Casual Leave" &&
      findLeaveDataById?.remainingCausalLeave <= 0
    ) {
      leaveWarning = true;
    } else if (
      body.leaveType === "Privilege Leave" &&
      findLeaveDataById?.remainingPrivilegeLeave <= 0
    ) {
      leaveWarning = true;
    } else if (
      body.leaveType === "Half-Day Leave" &&
      findLeaveDataById?.remainingHalfdayLeave <= 0
    ) {
      leaveWarning = true;
    } else if (
      body.leaveType === "Quater (1/4) Leave" &&
      findLeaveDataById?.remainingQuarterLeave <= 0
    ) {
      leaveWarning = true;
    } else if (
      body.leaveType === "Compensate leave" &&
      findLeaveDataById?.remainingCompensateLeave <= 0
    ) {
      leaveWarning = true;
    }

    console.log(leaveWarning, "Leave warning");
    return NextResponse.json(
      {
        success: true,
        message: leaveWarning
          ? `Warning: You don't have enough ${body.leaveType}, Please Be carefull before applying.`
          : `Leave reqeust Has been created successfully`,
        responseBody: null,
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
