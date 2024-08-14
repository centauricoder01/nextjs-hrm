import { connect } from "@/db/db";
import EmployeeModel from "@/model/employee.model";
import { NextResponse } from "next/server";

interface Params {
  employeeid: string;
}

export async function PATCH(request: Request, { params }: { params: Params }) {
  try {
    // Connect to the database
    await connect();

    const id = params.employeeid;
    const { currentPassword, ...updateData } = await request.json();

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
