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
    startTime: {
      type: Number,
      default: 0,
    },
    captureStart: {
      type: Number,
      default: 0,
    },
    captureEnd: {
      type: Number,
      default: 0,
    },
    breaks: [
      {
        start: {
          type: Number,
          default: 0,
        },
        end: {
          type: Number,
          default: 0,
        },
      },
    ],
    isOnBreak: {
      type: Boolean,
      default: false,
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
