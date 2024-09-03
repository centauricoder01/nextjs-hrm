import { verify } from "jsonwebtoken";
import { connect } from "@/db/db";
import EmployeeModel from "@/model/employee.model";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

export async function GET(request: Request) {
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

  try {
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

    await connect(); // mongoDB connection

    const user = await EmployeeModel.findById({ _id: decoded.id }).select(
      "-password"
    ); // Exclude password

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("User verification error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }
}
