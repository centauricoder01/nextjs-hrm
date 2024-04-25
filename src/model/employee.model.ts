import mongoose, { Schema } from "mongoose";
import { IEmployee } from "@/types/modals.types";
import bcrypt from "bcryptjs";

const employeeSchema: Schema<IEmployee> = new mongoose.Schema({
  employeeId: {
    type: String,
    required: [true, "employeeId is required"],
    trim: true,
    unique: true,
  },

  profileImage: {
    type: String,
    required: [true, "Profile Image is required"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
  },
  fullName: {
    type: String,
    required: [true, "FullName is required"],
  },
  birthDate: {
    type: Date,
  },
  maritalStatus: {
    type: Boolean,
  },
  mobileNumber: {
    type: Number,
    required: [true, "mobile number is required"],
  },
  fullAddress: {
    type: String,
    required: [true, "Address is required"],
  },
  joinDate: {
    type: Date,
    required: [true, "Please Provide Joining Date."],
  },
  leaveDate: {
    type: Date,
  },
  reasonForExit: {
    type: String,
  },
  department: {
    type: String,
    required: [true, "Please provide Department"],
  },
  designation: {
    type: String,
    required: [true, "what is designation"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Provide email"],
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },

  // BANK DETAILS START FROM HERE
  bankAccountNumber: {
    type: Number,
    required: [true, "Account Number is requried"],
  },
  bankIFSCCode: {
    type: String,
    required: [true, "IFSC code is required"],
  },
  bankName: {
    type: String,
    required: [true, "Bank Name is required"],
  },
  panNumber: {
    type: String,
    required: [true, "Pan Number is required"],
  },
  aadharNumber: {
    type: Number,
    required: [true, "Aadhar Number is required"],
  },
  state: {
    type: String,
    required: [true, "state is required"],
  },
  emergencyContactNumber: {
    type: Number,
    required: [true, "Emergency Contact Number is required"],
  },
});

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

const EmployeeModel =
  (mongoose.models.Employee as mongoose.Model<IEmployee>) ||
  mongoose.model<IEmployee>("Employee", employeeSchema);

export default EmployeeModel;