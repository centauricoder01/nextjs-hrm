import { connect } from "@/db/db";
import AttendenceModel from "@/model/attendence.model";
import EmployeeModel from "@/model/employee.model";
import { NextResponse } from "next/server";
import { z } from "zod";
import mongoose from "mongoose";

const schema = z.object({
  date: z.string(),
  employId: z.string(),
  location: z.string(),
  selfie: z.string(),
  timeIn: z.string(),
});

interface MainObject {
  date: Date;
  name: string;
  employeId: string | number;
  location: string;
  userId: mongoose.Types.ObjectId;
  selfie: string;
  timeIn?: string;
  timeOut?: string;
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
          message: "EmploeeId Does'nt Exist in Your base ",
          responseBody: null,
        },
        { status: 404 }
      );
    }

    // checking if employee login again or not
    if (body.attendenceOption === "TimeIn") {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0); // Today's date at midnight (start of today)

      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999); // End of today (just before midnight)

      const getTodayAttendence = await AttendenceModel.find({
        date: {
          $gte: startOfToday,
          $lte: endOfToday,
        },
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
   }

    // Creating the object to save the data
    const saveEmployeeAttendence: MainObject = {
      date: body.date,
      name: findEmployee.fullName,
      employeId: body.employId,
      userId: findEmployee._id,
      location: body.location,
      selfie: body.selfie,
    };

    if (body.attendenceOption === "TimeIn") {
      saveEmployeeAttendence.timeIn = body.timeIn;
    } else if (body.attendenceOption === "TimeOut") {
      saveEmployeeAttendence.timeOut = body.timeOut;
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
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    return Response.json(
      {
        success: true,
        responseBody: "Yes I am in the GET attendence body",
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
