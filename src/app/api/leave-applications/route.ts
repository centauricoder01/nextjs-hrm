import { connect } from "@/db/db";
import leaveModel from "@/model/leave-application.model";
import leaveDataModel from "@/model/leave-data.model";
import { ILeaveData } from "@/types/modals.types";
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

    // Mapping of leave types to their corresponding fields
    const leaveTypeFieldMap: { [key: string]: keyof typeof findLeaveDataById } =
      {
        "Sick Leave": "remainingSickLeave",
        "Causal Leave": "remainingCausalLeave",
        "Privilege Leave": "remainingPrivilegeLeave",
        "Halfday Leave": "remainingHalfdayLeave",
        "Quater (1/4) Leave": "remainingQuarterLeave",
        "Compensate leave": "remainingCompensateLeave",
      };

    const checkingLeaveAvailablity = leaveTypeFieldMap[body.leaveType];

    // ********************************************

    const startDate = new Date(body.startingDate);
    const endDate = new Date(body.endingDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error("Invalid date provided");
    }

    // Calculate the difference in milliseconds
    const differenceInMilliseconds: number =
      endDate.getTime() - startDate.getTime();

    // Convert the difference from milliseconds to days

    const differenceInDays = Math.ceil(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    // *******************************************

    if (
      (checkingLeaveAvailablity &&
        findLeaveDataById[checkingLeaveAvailablity] <= 0) ||
      findLeaveDataById[checkingLeaveAvailablity] < differenceInDays
    ) {
      return NextResponse.json(
        {
          success: true,
          message: `Leave Cannot be Granted, You have Taken or You are Taking more  ${body.leaveType} than you should take.`,
          responseBody: null,
        },
        { status: 200 }
      );
    }

    // Create the leave application
    const leaveApplication = new leaveModel(body);
    await leaveApplication.save();

    let leaveWarning = false;
    const leaveField = leaveTypeFieldMap[body.leaveType];

    // Check if the leave type field exists and the remaining leave is greater than 0
    if (leaveField && findLeaveDataById[leaveField] <= 1) {
      leaveWarning = true;
    }

    return NextResponse.json(
      {
        success: true,
        message: leaveWarning
          ? `Warning: Your ${body.leaveType} is About to expire, please be careful before applying.`
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

export async function PATCH(request: Request) {
  // Connect to the database
  await connect();
  try {
    const body = await request.json();
    const leaveApplicationId = body.id;
    const changeLeaveStatus = body.leaveStatus;
    // Find the leave application by ID and update its status
    const updatedApplication = await leaveModel.findByIdAndUpdate(
      leaveApplicationId,
      { leaveStatus: changeLeaveStatus },
      { new: true } // Return the updated document
    );

    if (!updatedApplication) {
      return NextResponse.json(
        {
          success: false,
          message: `Leave application with ID ${leaveApplicationId} not found.`,
          responseBody: null,
        },
        { status: 404 }
      );
    }

    if (changeLeaveStatus === "Rejected") {
      return NextResponse.json(
        {
          success: true,
          message: `Leave application status updated successfully.`,
          responseBody: updatedApplication,
        },
        { status: 200 }
      );
    }

    // UPDATEING THE LEAVE STATUS OF EMPOLOYEE
    const findLeaveDataById = await leaveDataModel.findOne({
      userId: updatedApplication.userId,
    });

    if (!findLeaveDataById) {
      return NextResponse.json(
        {
          success: false,
          message: "Employee Leave Data is Not Available",
          responseBody: null,
        },
        { status: 404 }
      );
    }

    const getLeaveTypeOfEmployee = updatedApplication.leaveType;

    // Create a mapping of leave type strings to the corresponding field names
    const leaveTypeFieldMap: { [key: string]: keyof ILeaveData } = {
      "Compensate Leave": "remainingCompensateLeave",
      "Sick Leave": "remainingSickLeave",
      "Causal Leave": "remainingCausalLeave",
      "Privilege Leave": "remainingPrivilegeLeave",
      "Halfday Leave": "remainingHalfdayLeave",
      "Quater (1/4)- Leave": "remainingQuarterLeave",
    };
    const leaveField = leaveTypeFieldMap[getLeaveTypeOfEmployee];

    if (leaveField && findLeaveDataById[leaveField] > 0) {
      // Decrement the leave by one
      // Cast to any to bypass TypeScript error and then to number
      const leaveData = findLeaveDataById.toObject() as any;

      const startDate = new Date(updatedApplication.startingDate);
      const endDate = new Date(updatedApplication.endingDate);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error("Invalid date provided");
      }

      // Calculate the difference in milliseconds
      const differenceInMilliseconds: number =
        endDate.getTime() - startDate.getTime();

      // Convert the difference from milliseconds to days

      const differenceInDays = Math.ceil(
        differenceInMilliseconds / (1000 * 60 * 60 * 24)
      );

      // Decrement the leave by one
      leaveData[leaveField] =
        (leaveData[leaveField] as number) - differenceInDays;

      await findLeaveDataById.updateOne(
        {
          [leaveField]: leaveData[leaveField],
        },
        { new: true }
      );

      return NextResponse.json(
        {
          success: true,
          message: `${getLeaveTypeOfEmployee} has been decremented by ${differenceInDays}.`,
          responseBody: null,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `You don't have ${getLeaveTypeOfEmployee} any more...`,
        responseBody: findLeaveDataById,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in the Leave Data response:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred",
        responseBody: null,
      },
      { status: 500 }
    );
  }
}

