import mongoose, { Schema } from "mongoose";
import { ILeave } from "@/types/modals.types";

const leaveSchema: Schema<ILeave> = new mongoose.Schema({
  leaveType: {
    type: String,
    required: [true, "Leave Type is required"],
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
  userId: { type: Schema.Types.ObjectId, ref: "Employee", index: true },
  leaveStatus: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Rejected", "OnHold"],
  },
});

const leaveModel =
  (mongoose.models.Leave as mongoose.Model<ILeave>) ||
  mongoose.model<ILeave>("Leave", leaveSchema);

export default leaveModel;
