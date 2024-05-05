import { Document, Schema } from "mongoose";

export interface IEmployee extends Document {
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
  password: string;
  bankAccountNumber: number;
  bankIFSCCode: string;
  bankName: string;
  panNumber: string;
  aadharNumber: Number;
  state: string;
  emergencyContactNumber: number;
  // METHOD STARTS FROM HERE
  matchPassword(password: string): Promise<boolean>;
  generateTempToken(): Promise<string>;
  generateAccessToken(): Promise<string>;
  generateRefreshToken(): Promise<string>;
  removeSensitiveFields(): Promise<void>;
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
