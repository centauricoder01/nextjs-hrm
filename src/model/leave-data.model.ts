import mongoose, { Schema } from "mongoose";
import { ILeaveData } from "@/types/modals.types";

const leaveDataSchema: Schema<ILeaveData> = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    index: true,
    required: true,
  },
  remainingCompensateLeave: {
    type: Number,
    default: 12,
  },
  remainingSickLeave: {
    type: Number,
    default: 6,
  },
  remainingCausalLeave: {
    type: Number,
    default: 12,
  },
  remainingPrivilegeLeave: {
    type: Number,
    default: 15,
  },
  remainingHalfdayLeave: {
    type: Number,
    default: 5,
  },
  remainingQuarterLeave: {
    type: Number,
    default: 3,
  },
});

const leaveDataModel =
  (mongoose.models.Leavedata as mongoose.Model<ILeaveData>) ||
  mongoose.model<ILeaveData>("Leavedata", leaveDataSchema);

export default leaveDataModel;
