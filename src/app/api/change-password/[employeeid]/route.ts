import { connect } from "@/db/db";
import EmployeeModel from "@/model/employee.model";
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

interface Params {
  employeeid: string;
}

export async function PATCH(request: Request, { params }: { params: Params }) {
  try {
    const authCookie = cookies().get("authToken");
    const id = params.employeeid;
    const { currentPassword, ...updateData } = await request.json();

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

    if (decoded.id !== id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unauthorized: You are not authorized to change the password",
        },
        { status: 401 }
      );
    }

    // Connect to the database
    await connect();

    // Find the employee by ID
    const employee = await EmployeeModel.findById(id);

    if (!employee) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Employee not found. Please provide the correct Employee ID.",
          responseBody: null,
        },
        { status: 404 }
      );
    }

    // Check if the current password matches
    if (currentPassword !== employee.password) {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect current password.",
          responseBody: null,
        },
        { status: 401 }
      );
    }

    // Update the employee data
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedEmployee) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update employee information.",
          responseBody: null,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Employee information updated successfully.",
        responseBody: updatedEmployee,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating employee information:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while updating employee information.",
        responseBody: error,
      },
      { status: 500 }
    );
  }
}
