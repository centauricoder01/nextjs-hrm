import { connect } from "@/db/db";
import EmployeeModel from "@/model/employee.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await connect();
  try {
    // const body = await request.json();
    // const newEmployee = new EmployeeModel(body);
    // await newEmployee.save();
    // return NextResponse.json(
    //   {
    //     success: true,
    //     responseBody: {
    //       data: body,
    //     },
    //   },
    //   { status: 200 }
    // );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error came in the employee response",
        error,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const value = await EmployeeModel.find();
    return Response.json(
      {
        success: true,
        responseBody: value,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error came in the employee response:", error);
    return Response.json(
      {
        success: false,
        message: "Error came in the employee response",
      },
      { status: 500 }
    );
  }
}
