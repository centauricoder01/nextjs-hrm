import mongoose, { Schema, Model } from "mongoose";
import { ITimer } from "@/types/modals.types";

const timerSchema: Schema<ITimer> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      index: true,
      required: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    // time: {
    //   type: String,
    //   required: [true, "Time is required"],
    // },
    workingHourStatus: {
      type: Boolean,
    },
    startTime: {
      type: Number,
      default: null,
    },
    elapsedTime: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: false }
);

const TimerModel: Model<ITimer> =
  mongoose.models.Timer || mongoose.model<ITimer>("Timer", timerSchema);

export default TimerModel;
