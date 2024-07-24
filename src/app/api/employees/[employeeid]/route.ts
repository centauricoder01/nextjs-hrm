import { connect } from "@/db/db";
import EmployeeModel from "@/model/employee.model";
import { NextResponse } from "next/server";

interface Params {
  employeeid: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  // Connect to the database
  await connect();
  try {
    const id = params.employeeid;

    const getAttendenceById = await EmployeeModel.findOne({ _id: id });

    if (!getAttendenceById) {
      return NextResponse.json(
        {
          success: false,
          message: "Please Provide Correct Employee ID",
          responseBody: null,
        },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "We got you the Employee Profile",
        responseBody: getAttendenceById,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error came in the Singel Employee response:", error);
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

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    await connect();
    const id = params.employeeid;

    const deleteEmployeeById = await EmployeeModel.findByIdAndDelete({
      _id: id,
    });

    if (!deleteEmployeeById) {
      return NextResponse.json(
        {
          success: false,
          message: "Please Provide Correct Employee ID",
          responseBody: null,
        },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Employee Deleted successfully",
        responseBody: null,
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

export async function PATCH(request: Request, { params }: { params: Params }) {
  try {
    await connect();
    const id = params.employeeid;
    const updateEmployeeInfo = await request.json();

    const updateEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      { $set: updateEmployeeInfo },
      { new: true }
    );

    if (!updateEmployee) {
      return NextResponse.json(
        {
          success: false,
          message: "Please Provide Correct Employee ID",
          responseBody: null,
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "We have Updated the Employee Info ",
        responseBody: updateEmployee,
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

// // Define generateStaticParams function
// export async function generateStaticParams() {
//   // Connect to the database
//   await connect();

//   // Fetch all employee IDs to generate static paths
//   const employees = await EmployeeModel.find({}, "_id").exec();
//   return employees.map((employee) => ({
//     employeeid: employee._id.toString(),
//   }));
// }
