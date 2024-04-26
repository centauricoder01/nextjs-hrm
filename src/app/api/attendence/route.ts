import { connect } from "@/db/db";
import AttendenceModel from "@/model/attendence.model";

export async function POST(request: Request) {
  // Connect to the database
  await connect();

  try {
    return Response.json(
      {
        success: true,
        responseBody: "Yes I am in the POST attendence body",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error came in the attendence response:", error);
    return Response.json(
      {
        success: false,
        message: "Error came in the attendence response",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    return Response.json(
      {
        success: true,
        responseBody: "Yes I am in the GET attendence body",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error came in the attendence response:", error);
    return Response.json(
      {
        success: false,
        message: "Error came in the attendence response",
      },
      { status: 500 }
    );
  }
}
