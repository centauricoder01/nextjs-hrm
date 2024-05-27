import { Document, Schema } from "mongoose";

// In your types/modals.types.ts file
export interface IEmployee {
  _id: string;
  profileImage: string;
  fullName: string;
  employeeId: string;
  designation: string;
  birthDate: string;
  joinDate: string;
  maritalStatus: string;
  mobileNumber: number;
  fullAddress: string;
  leaveDate: string;
  reasonForExit: string;
  department: string;
  email: string;
  bankAccountNumber: number;
  bankIFSCCode: string;
  bankName: string;
  panNumber: string;
  aadharNumber: number;
  state: string;
  emergencyContactNumber: number;
  gender: string;
  role: string;
  password: string;
  aadhaarImage: string;
  pancardImage: string;
  relativeAadhaarImage: string;
  office: string;
}

export interface IEmployeeWithEdits {
  _id: string;
  profileImage: string;
  fullName: string;
  employeeId: string;
  designation: string;
  birthDate: string;
  joinDate: string;
  maritalStatus: string;
  mobileNumber: number;
  fullAddress: string;
  leaveDate: string;
  reasonForExit: string;
  department: string;
  email: string;
  bankAccountNumber: number;
  bankIFSCCode: string;
  bankName: string;
  panNumber: string;
  aadharNumber: number;
  state: string;
  emergencyContactNumber: number;
  gender: string;
  role: string;
  password: string;
}

export interface IAttendence extends Document {
  date: string;
  name: string;
  employeId: string;
  userId: Schema.Types.ObjectId;
  timeInLocation: string;
  timeOutLocation: string;
  timeInSelfie: string;
  timeOutSelfie: string;
  timeIn: string;
  timeOut: string;
}

export interface ILeaveApplication extends Document {
  leaveType: string;
  reason: string;
  startingDate: Date;
  endingDate: Date;
  userId: Schema.Types.ObjectId;
  leaveStatus: string;
}

export interface ILeaveData extends Document {
  userId: Schema.Types.ObjectId;
  remainingCompensateLeave: number;
  remainingSickLeave: number;
  remainingCausalLeave: number;
  remainingPrivilegeLeave: number;
  remainingHalfdayLeave: number;
  remainingQuarterLeave: number;
}

export interface ITimer extends Document {
  userId: Schema.Types.ObjectId;
  date: Date;
  startTime: number;
  endTime: number;
  breaks: {
    start?: number;
    end?: number;
  }[];
  isOnBreak: boolean;
  elapsedTime: number;
}
