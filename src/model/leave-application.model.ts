import mongoose, { Schema } from "mongoose";
import { ILeaveApplication } from "@/types/modals.types";

const leaveApplicationSchema: Schema<ILeaveApplication> = new mongoose.Schema({
  leaveType: {
    type: String,
    required: [true, "Leave Type is required"],
    enum: [
      "Sick Leave",
      "Causal Leave",
      "Privilege Leave",
      "Halfday Leave",
      "Quater (1/4) Leave",
      "Compensate leave",
    ],
  },
  reason: {
    type: String,
    required: [true, "Reason is Required "],
  },
  startingDate: {
    type: Date,
    required: [true, "Starting Date is Required "],
  },
  endingDate: {
    type: Date,
    required: [true, "Ending Date is Required "],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    index: true,
    required: true,
  },
  leaveStatus: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Rejected", "Approved"],
  },
});

const leaveApplicationModel =
  (mongoose.models.Leaveapplication as mongoose.Model<ILeaveApplication>) ||
  mongoose.model<ILeaveApplication>("Leaveapplication", leaveApplicationSchema);

export default leaveApplicationModel;
