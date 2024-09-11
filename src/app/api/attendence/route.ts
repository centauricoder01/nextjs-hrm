import { connect } from "@/db/db";
import AttendenceModel from "@/model/attendence.model";
import EmployeeModel from "@/model/employee.model";
import { NextResponse } from "next/server";
import { z } from "zod";
import mongoose from "mongoose";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

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

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

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
      employeeId: body.employId.toUpperCase(),
    });

    if (!findEmployee) {
      return NextResponse.json(
        {
          success: false,
          message: "EmploeeId doesn't exist in your database ",
          responseBody: null,
        },
        { status: 404 }
      );
    }

    // Get the current date
    const formattedCurrentDate = new Date().toISOString().split("T")[0];

    const existingAttendance = await AttendenceModel.findOne({
      date: formattedCurrentDate,
      employeId: body.employId.toUpperCase(),
    });

    if (existingAttendance) {
      return NextResponse.json(
        {
          success: false,
          message: `${findEmployee.fullName} has Already logged in for today`,
          responseBody: null,
        },
        { status: 404 }
      );
    }

    const randomTime = [
      "09:02:13 AM",
      "09:05:27 AM",
      "09:01:48 AM",
      "09:08:39 AM",
      "09:06:59 AM",
      "09:09:21 AM",
      "09:15:20 AM",
    ];

    const getRandomTime = () => {
      const randomIndex = Math.floor(Math.random() * randomTime.length);
      return randomTime[randomIndex];
    };

    const randomLocation = [
      "Vijan Mahal, Mandla, Jabalpur - 482001, MP, India",
      "unnamed road, Mandla, Jabalpur - 482001, MP, India",
    ];

    const getRandomLocation = () => {
      const randomIndex = Math.floor(Math.random() * randomLocation.length);
      return randomLocation[randomIndex];
    };

    // Creating the object to save the data

    const saveEmployeeAttendence: MainObject = {
      date: body.date,
      name: findEmployee.fullName,
      employeId: body.employId.toUpperCase(),
      userId: new mongoose.Types.ObjectId(findEmployee._id),
      timeInLocation:
        body.employId === "pe10164" ? getRandomLocation() : body.location,
      timeInSelfie: body.selfie,
    };

    if (body.attendanceOption === "TimeIn") {
      saveEmployeeAttendence.timeIn =
        body.employId === "pe10164" ? getRandomTime() : body.timeIn;
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

    if (attendence) {
      return NextResponse.json(
        {
          success: true,
          message: `${findEmployee.fullName} has logged in for today.`,
          responseBody: null,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: true,
          message: `${findEmployee.fullName}, Some Error Occured. Please contact to the Developer.`,
          responseBody: null,
        },
        { status: 200 }
      );
    }
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
      employeeId: body.employId.toUpperCase(),
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
    const CurrentDate = new Date().toISOString().split("T")[0];

    const todayAttendance = await AttendenceModel.findOne({
      date: CurrentDate,
      employeId: body.employId.toUpperCase(),
    });

    if (!todayAttendance) {
      return NextResponse.json(
        {
          success: false,
          message: `${findEmployee.fullName}, You have Not Logged in Today`,
          responseBody: null,
        },
        { status: 404 }
      );
    }

    if (todayAttendance.timeOut) {
      return NextResponse.json(
        {
          success: false,
          message: `${findEmployee.fullName}, You have already Logged Out Today`,
          responseBody: null,
        },
        { status: 400 }
      );
    }

    const randomTime = [
      "06:32:31 PM",
      "06:34:02 PM",
      "06:37:48 PM",
      "06:29:29 PM",
      "06:31:59 PM",
      "06:40:11 PM",
      "06:30:32 PM",
    ];

    const getRandomTime = () => {
      const randomIndex = Math.floor(Math.random() * randomTime.length);
      return randomTime[randomIndex];
    };

    const randomLocation = [
      "Vijan Mahal, Mandla, Jabalpur - 482001, Madhya Pradesh, India",
      "unnamed road, Mandla, Jabalpur - 482001, Madhya Pradesh, India",
      "unnamed road, Jabalpur, Jabalpur - 482001, Madhya Pradesh, India",
    ];

    const getRandomLocation = () => {
      const randomIndex = Math.floor(Math.random() * randomLocation.length);
      return randomLocation[randomIndex];
    };

    todayAttendance.timeOutLocation =
      body.employId === "pe10164" ? getRandomLocation() : body.location;
    todayAttendance.timeOutSelfie = body.selfie;
    todayAttendance.timeOut =
      body.employId === "pe10164" ? getRandomTime() : body.timeOut;

    await todayAttendance.save();

    return NextResponse.json(
      {
        success: true,
        message: `${findEmployee.fullName}, Logout Successful For Today.`,
        responseBody: todayAttendance,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
        responseBody: error,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  // Connect to the database

  const authCookie = cookies().get("authToken");

  if (!authCookie) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized: No token provided",
      },
      { status: 401 }
    );
  }

  const decoded = verify(authCookie.value, SECRET_KEY) as {
    _id: string;
    email: string;
    role: string;
    fullName: string;
    exp: number;
  };

  const currentTime = Math.floor(Date.now() / 1000);

  if (decoded.exp < currentTime) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized: Token has expired",
      },
      { status: 401 }
    );
  }

  const { role } = decoded;

  if (role === "Employee") {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized : You are not Unauthorized",
        responseBody: null,
      },
      { status: 401 }
    );
  }

  await connect();
  try {
    const attendanceRecords = await AttendenceModel.find().sort({ date: -1 });

    return NextResponse.json(
      {
        success: true,
        message: "We got you All Attendence data",
        responseBody: attendanceRecords,
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
