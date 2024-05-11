import { connect } from "@/db/db";
import AttendenceModel from "@/model/attendence.model";
import EmployeeModel from "@/model/employee.model";
import { NextResponse } from "next/server";
import { z } from "zod";
import mongoose from "mongoose";

const schema = z.object({
  date: z.string(),
  employId: z.string(),
  timeInLocation: z.optional(z.string()),
  timeOutLocation: z.optional(z.string()),
  timeInSelfie: z.optional(z.string()),
  timeOutSelfie: z.optional(z.string()),
  timeIn: z.optional(z.string()),
  attendanceOption: z.string(),
  timeOut: z.optional(z.string()),
});

interface MainObject {
  date: string;
  name: string;
  userId: mongoose.Types.ObjectId;
  employeId: string | number;
  timeInLocation?: string;
  timeOutLocation?: string;
  timeInSelfie?: string;
  timeOutSelfie?: string;
  timeIn?: Date;
  timeOut?: Date;
}

export async function POST(request: Request) {
  // Connect to the database
  await connect();
  try {
    const body = await request.json();
    // Zod Validation
    const validationResult = schema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input",
          responseBody: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    // Finding the Employee
    const findEmployee = await EmployeeModel.findOne({
      employeeId: body.employId,
    });

    if (!findEmployee) {
      return NextResponse.json(
        {
          success: false,
          message: "EmploeeId Does'nt Exist in Your database ",
          responseBody: null,
        },
        { status: 404 }
      );
    }
    // Get the current date
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split("T")[0];

    const getTodayAttendence = await AttendenceModel.find({
      date: formattedCurrentDate, // Only search for today's date
    });

    const employeeExists =
      getTodayAttendence.find(
        (employee) => employee.employeId === body.employId
      ) !== undefined;

    if (employeeExists) {
      return NextResponse.json(
        {
          success: false,
          message: `${findEmployee.fullName} has Already logged in for today`,
          responseBody: null,
        },
        { status: 404 }
      );
    }

    // Creating the object to save the data
    const saveEmployeeAttendence: MainObject = {
      date: body.date,
      name: findEmployee.fullName,
      employeId: body.employId,
      userId: findEmployee._id,
      timeInLocation: body.location,
      timeInSelfie: body.selfie,
    };

    if (body.attendanceOption === "TimeIn") {
      saveEmployeeAttendence.timeIn = body.timeIn;
    }

    // Validating the object so that, Not even a single object is Empty
    const isEmpty = Object.values(saveEmployeeAttendence).some((value) => {
      return value === undefined || value === null || value === "";
    });

    if (isEmpty) {
      return NextResponse.json(
        {
          success: false,
          message: "All Values are Required",
          responseBody: null,
        },
        { status: 204 }
      );
    }
    // Saving the TimeIn data

    const attendence = new AttendenceModel(saveEmployeeAttendence);
    await attendence.save();
    return NextResponse.json(
      {
        success: true,
        message: `${findEmployee.fullName} has logged in for today`,
        responseBody: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error came in the attendence response:", error);
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

export async function PATCH(request: Request) {
  // Connect to the database
  await connect();
  try {
    const body = await request.json();
    // Zod Validation
    const validationResult = schema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input",
          responseBody: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    // Finding the Employee
    const findEmployee = await EmployeeModel.findOne({
      employeeId: body.employId,
    });

    if (!findEmployee) {
      return NextResponse.json(
        {
          success: false,
          message: "EmploeeId Does'nt Exist in Your database ",
          responseBody: null,
        },
        { status: 404 }
      );
    }
    // Get start of today in UTC timezone
    // Get the current date
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split("T")[0];

    const getTodayAttendence = await AttendenceModel.find({
      date: formattedCurrentDate, // Only search for today's date
    });

    const employeeExists = getTodayAttendence.some(
      (employee) => employee.employeId === body.employId
    );

    if (!employeeExists) {
      return NextResponse.json(
        {
          success: false,
          message: `${findEmployee.fullName} You have Not Logged in Today`,
          responseBody: null,
        },
        { status: 404 }
      );
    }

    const foundObject = getTodayAttendence.find(
      (obj) => obj.employeId === body.employId
    );

    if (foundObject?.timeOut !== null) {
      return NextResponse.json(
        {
          success: false,
          message: `${findEmployee.fullName} You have already Logged Out Today`,
          responseBody: null,
        },
        { status: 404 }
      );
    }
    // Find the document with the matching employeId
    const updatedDocument = await AttendenceModel.findByIdAndUpdate(
      { _id: foundObject._id },
      {
        timeOutLocation: body.location,
        timeOutSelfie: body.selfie,
        timeOut: body.timeOut,
      },
      { new: true }
    );

    if (!updatedDocument) {
      return Response.json(
        {
          success: false,
          message: "Could not Timed out, Please try again.",
          responseBody: null,
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: true,
        message: `${findEmployee.fullName}, Logout Successfull For Today`,
        responseBody: updatedDocument,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error came in the attendence response:", error);
    return Response.json(
      {
        success: false,
        message: error,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  // Connect to the database
  await connect();

  try {
    const getAttendenceByDate = await AttendenceModel.find();

    return NextResponse.json(
      {
        success: true,
        message: "We got you All Attendence Date",
        responseBody: getAttendenceByDate,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error came in the get all attendence response:", error);
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
