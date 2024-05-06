import { Document, Schema } from "mongoose";

export interface IEmployee {
  employeeId: string;
  profileImage: string;
  gender: string;
  fullName: string;
  birthDate: Date;
  maritalStatus: boolean;
  mobileNumber: number;
  fullAddress: string;
  joinDate: Date;
  leaveDate: Date;
  reasonForExit: string;
  department: string;
  designation: string;
  email: string;
  role: string;
  password: string;
  bankAccountNumber: number;
  bankIFSCCode: string;
  bankName: string;
  panNumber: string;
  aadharNumber: Number;
  state: string;
  emergencyContactNumber: number;
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
