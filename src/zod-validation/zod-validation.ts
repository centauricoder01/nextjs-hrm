import { z } from "zod";

export const employeeDetailValidation = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  employeeId: z.string().min(6, {
    message: "Please enter Valid EmployeeId of atleast 6 Character",
  }),
  gender: z.string(),

  //   profileImage: string;
  fullName: z.string().min(4, {
    message: "Name must be atleast 3 Character",
  }),
  birthDate: z.date(),
  maritalStatus: z.boolean(),
  mobileNumber: z
    .number()
    .min(10, "Mobile number must be atleast 10 character"),
  fullAddress: z.string().min(5, {
    message: "Address must be atleast 5 Character",
  }),
  joinDate: z.date(),
  leaveDate: z.date(),
  reasonForExit: z.string().min(5, {
    message: "Address must be atleast 5 Character",
  }),
  department: z.string(),
  designation: z.string(),
  email: z.string().email(),
  bankAccountNumber: z.number().min(16, "Account number must be 16 Digit"),
  bankIFSCCode: z.string().min(7, {
    message: "Bank IFSC code must be atleast 7 Character",
  }),
  bankName: z.string().min(5, {
    message: "Please Enter fullName of the bank",
  }),
  panNumber: z.string().min(7, {
    message: "Pan card number must be atleast 7 Character",
  }),
  aadharNumber: z.number().min(11, "Aadhar number must be 11 Digit"),
  state: z.string(),
  emergencyContactNumber: z
    .number()
    .min(10, "Mobile number must be atleast 10 character"),
});
