import mongoose, { Schema } from "mongoose";
import { IAttendence } from "@/types/modals.types";

const attendenceSchema: Schema<IAttendence> = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    name: {
      type: String,
      required: [true, "Date is required"],
    },
    employeId: {
      type: String,
      required: [true, "EmployeeId is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    selfie: {
      type: String,
      required: [true, "Selfie is required"],
    },
    timeIn: {
      type: Date,
    },
    timeOut: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const AttendenceModel =
  (mongoose.models.Employee as mongoose.Model<IAttendence>) ||
  mongoose.model<IAttendence>("Attendence", attendenceSchema);

export default AttendenceModel;
