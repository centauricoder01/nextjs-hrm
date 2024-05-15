import { connect } from "@/db/db";
import EmployeeModel from "@/model/employee.model";
import { NextResponse } from "next/server";

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
    const value = await EmployeeModel.find(
      {},
      { password: 0, aadhaarImage: 0, pancardImage: 0, relativeAadhaarImage: 0 }
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
