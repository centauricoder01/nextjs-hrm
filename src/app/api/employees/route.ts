import { connect } from "@/db/db";
import EmployeeModel from "@/model/employee.model";
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

export async function POST(request: Request) {
  await connect();
  try {
    const body = await request.json();
    const newEmployee = new EmployeeModel(body);
    await newEmployee.save();
    return NextResponse.json(
      {
        success: true,
        message: "Employee Added Successfully",
        responseBody: null,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Some Error Occured",
        responseBody: error,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connect();

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
      id: string;
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

    if (role !== "Admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized: You can't access this.",
        },
        { status: 401 }
      );
    }
    const value = await EmployeeModel.find(
      {},
      {
        password: 0,
        aadhaarImage: 0,
        pancardImage: 0,
        relativeAadhaarImage: 0,
      }
    );

    return Response.json(
      {
        success: true,
        message: "All Employees Fetched Successfully",
        responseBody: value,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error came in the employee response:", error);
    return Response.json(
      {
        success: false,
        message: "Some Error Occured",
        responseBody: error,
      },
      { status: 500 }
    );
  }
}
