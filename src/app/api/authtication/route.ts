import { connect } from "@/db/db";
import EmployeeModel from "@/model/employee.model";
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key"; // Ensure to set this in your environment variables

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

    if (findByEmail.password !== password) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Password, Please correct it and try again.",
          responseBody: null,
        },
        { status: 401 }
      );
    }

    const payload = {
      id: findByEmail._id,
      email: findByEmail.email,
      role: findByEmail.role,
      profileImage: findByEmail.profileImage,
      fullName: findByEmail.fullName,
    };

    const token = sign(payload, SECRET_KEY, { expiresIn: "1d" });

    const response = NextResponse.json(
      {
        success: true,
        message: "Employee Info",
        responseBody: payload,
      },
      { status: 200 }
    );

    response.headers.set(
      "Set-Cookie",
      serialize("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 86400, // 1 hour in seconds
        path: "/",
      })
    );

    return response;
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
