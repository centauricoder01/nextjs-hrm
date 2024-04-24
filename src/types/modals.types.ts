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
  date: Date;
  name: string;
  employeId: string;
  userId: Schema.Types.ObjectId;
  location: string;
  selfie: string;
  timeIn: Date;
  timeOut: Date;
}
