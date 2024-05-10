import { Document, Schema } from "mongoose";

export interface IEmployee {
  employeeId: string;
  profileImage: string;
  gender: string;
  fullName: string;
  birthDate: string;
  maritalStatus: string;
  mobileNumber: number;
  fullAddress: string;
  joinDate: string;
  leaveDate: string;
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
  aadharNumber: number;
  state: string;
  aadhaarImage: string;
  pancardImage: string;
  relativeAadhaarImage: string;
  office: string;
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
