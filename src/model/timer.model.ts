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
      required: [true, "Start Time is Required"],
    },
    endTime: {
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

// Add a virtual field to calculate the total work duration
timerSchema.virtual("workDuration").get(function () {
  const breaks = this.breaks || [];
  const totalBreakDuration = breaks.reduce((total, break_) => {
    if (break_.start && break_.end) {
      return total + (break_.end - break_.start);
    }
    return total;
  }, 0);
  return this.endTime - this.startTime - totalBreakDuration;
});

const TimerModel: Model<ITimer> =
  mongoose.models.Timer || mongoose.model<ITimer>("Timer", timerSchema);

export default TimerModel;
