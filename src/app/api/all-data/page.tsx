import { connect } from "@/db/db";
import leaveModel from "@/model/leave-application.model";
import leaveDataModel from "@/model/leave-data.model";
import EmployeeModel from "@/model/employee.model";

import { ILeaveData } from "@/types/modals.types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Connect to the database
  await connect();
    try {
      
  } catch (error) {}
}
