import { connect } from "@/db/db";
import EmployeeModel from "@/model/employee.model";

export async function POST(request: Request) {
  // Connect to the database
  await connect();
  try {
    const body = await request.json();
    const newEmployee = new EmployeeModel(body);

    await newEmployee.save();
    return Response.json(
      {
        success: true,
        responseBody: body,
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
