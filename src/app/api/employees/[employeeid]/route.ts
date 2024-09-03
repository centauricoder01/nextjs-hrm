import { connect } from "@/db/db";
import EmployeeModel from "@/model/employee.model";
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

interface Params {
  employeeid: string;
}

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

export async function GET(request: Request, { params }: { params: Params }) {
  // Connect to the database
  await connect();
  try {
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

    const { id, role } = decoded;

    if (role === "Employee") {
      const getAttendenceById = await EmployeeModel.findOne({ _id: id });

      if (!getAttendenceById) {
        return NextResponse.json(
          {
            success: false,
            message: "Unauthorized : You are not Unauthorized",
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
    }

    const EmployeeId = params.employeeid;

    const getAttendenceById = await EmployeeModel.findOne({ _id: EmployeeId });

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
