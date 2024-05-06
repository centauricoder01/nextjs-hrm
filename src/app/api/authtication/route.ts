import { connect } from "@/db/db";
import EmployeeModel from "@/model/employee.model";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  // Connect to the database
  await connect();
  try {
    const { email, password } = await request.json();
    if (!email && !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide both the value",
          responseBody: null,
        },
        { status: 404 }
      );
    }
    const findByEmail = await EmployeeModel.findOne({ email });
    if (!findByEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Email or Password, Please Check and try Again",
          responseBody: null,
        },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      findByEmail.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Password, Please correct it and try again.",
          responseBody: null,
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Employee Info",
        responseBody: findByEmail,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error came in the Authtication response:", error);
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
