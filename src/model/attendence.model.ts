import mongoose, { Schema } from "mongoose";
import { IAttendence } from "@/types/modals.types";

const attendenceSchema: Schema<IAttendence> = new mongoose.Schema(
  {
    date: {
      type: String,
      required: [true, "Date is required"],
      index: true,
    },
    name: {
      type: String,
      required: [true, "Date is required"],
    },
    employeId: {
      type: String,
      required: [true, "EmployeeId is required"],
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      index: true,
    },
    timeInLocation: {
      type: String,
      default: null,
    },
    timeOutLocation: {
      type: String,
      default: null,
    },
    timeInSelfie: {
      type: String,
      default: null,
    },
    timeOutSelfie: {
      type: String,
      default: null,
    },
    timeIn: {
      type: String,
      default: null,
    },
    timeOut: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const AttendenceModel =
  (mongoose.models.Attendence as mongoose.Model<IAttendence>) ||
  mongoose.model<IAttendence>("Attendence", attendenceSchema);

export default AttendenceModel;
