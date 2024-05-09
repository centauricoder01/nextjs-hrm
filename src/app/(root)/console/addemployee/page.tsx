"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { employeeDetailValidation } from "@/zod-validation/zod-validation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import UploadImage from "@/components/uploadImage";

interface CloudinaryUploadWidgetInfo {
  public_id: string;
  secure_url: string;
  url: string;
  [key: string]: any;
}

const AddEmployee = () => {
  const [profileImage, setProfileImage] = useState<
    CloudinaryUploadWidgetInfo | undefined
  >(undefined);
  const [aadharImage, setAadharImage] = useState<
    CloudinaryUploadWidgetInfo | undefined
  >(undefined);
  const [panCardImage, setPanCardImage] = useState<
    CloudinaryUploadWidgetInfo | undefined
  >(undefined);
  const [relativeAadhaarImage, setRelativeAadhaarImage] = useState<
    CloudinaryUploadWidgetInfo | undefined
  >(undefined);
  const form = useForm<z.infer<typeof employeeDetailValidation>>({
    resolver: zodResolver(employeeDetailValidation),
    defaultValues: {
      employeeId: "",
      profileImage: "",
      gender: "",
      fullName: "",
      birthDate: new Date(),
      maritalStatus: "",
      mobileNumber: 0,
      fullAddress: "",
      joinDate: new Date(),
      leaveDate: new Date(),
      reasonForExit: "",
      department: "",
      designation: "",
      email: "",
      password: "",
      bankAccountNumber: 0,
      bankIFSCCode: "",
      bankName: "",
      panNumber: "",
      aadharNumber: 0,
      state: "",
      aadhaar: "",
      pancard: "",
      relativeAadhaar: "",
      emergencyContactNumber: 0,
      role: "",
      office: "",
    },
  });

  function onSubmit(values: z.infer<typeof employeeDetailValidation>) {
    values.profileImage =
      profileImage?.secure_url ??
      "https://res.cloudinary.com/dkorzhbbk/image/upload/v1715246972/planedu-hrm/c7rpsbalxqk21s2ic67r.png";
    values.aadhaar =
      aadharImage?.secure_url ??
      "https://res.cloudinary.com/dkorzhbbk/image/upload/v1715246972/planedu-hrm/c7rpsbalxqk21s2ic67r.png";
    values.pancard =
      panCardImage?.secure_url ??
      "https://res.cloudinary.com/dkorzhbbk/image/upload/v1715246972/planedu-hrm/c7rpsbalxqk21s2ic67r.png";
    values.relativeAadhaar =
      relativeAadhaarImage?.secure_url ??
      "https://res.cloudinary.com/dkorzhbbk/image/upload/v1715246972/planedu-hrm/c7rpsbalxqk21s2ic67r.png";
    console.log(values);
  }
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-start items-center border bg-[#c3eeff] m-5 p-5 rounded-md">
        <h1 className="text-[2rem] font-bold">Add Employee</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" m-5 flex flex-wrap gap-5 w-full">
              <FormInput
                control={form.control}
                name={"employeeId"}
                formlabel={"Employee ID"}
                type="text"
                width={"w-80"}
              />

              <div className="w-80  flex justify-between flex-col">
                <label>Upload Profile Pic</label>
                <UploadImage
                  buttonName={"Upload picture"}
                  handleImage={setProfileImage}
                  classValue={
                    "border p-2 font-bold bg-white-100 text-black rounded-sm"
                  }
                />
              </div>

              <FormSelect
                control={form.control}
                name={"gender"}
                formlabel={"Gender"}
                selectValue={["Male", "Female", "Others"]}
                selectPlaceholder={"Choose Gender"}
                width={"w-[300px]"}
              />
              <FormInput
                control={form.control}
                name={"fullName"}
                formlabel={"Full Name"}
                type="text"
                width={"w-80"}
              />
              <FormInput
                control={form.control}
                name={"birthDate"}
                formlabel={"Date of Birth"}
                type="date"
                width={"w-80"}
              />
              <FormSelect
                control={form.control}
                name={"maritalStatus"}
                formlabel={"Marital Status"}
                selectValue={["Married", "Unmarried"]}
                selectPlaceholder={"Choose Marital Status"}
                width={"w-[300px]"}
              />
              <FormInput
                control={form.control}
                name={"mobileNumber"}
                formlabel={"Mobile Number"}
                type="number"
                width={"w-80"}
              />
              <FormInput
                control={form.control}
                name={"fullAddress"}
                formlabel={"Full Address"}
                type="text"
                width={"w-80"}
              />
              <FormInput
                control={form.control}
                name={"joinDate"}
                formlabel={"Joining Date"}
                type="date"
                width={"w-80"}
              />
              <FormInput
                control={form.control}
                name={"leaveDate"}
                formlabel={"Leaving Date"}
                type="date"
                width={"w-80"}
              />
              <FormInput
                control={form.control}
                name={"reasonForExit"}
                formlabel={"Reason For Exit"}
                type="text"
                width={"w-80"}
              />
              <FormSelect
                control={form.control}
                name={"department"}
                formlabel={"Department"}
                width={"w-[300px]"}
                selectValue={[
                  "COUNSELLING/SALES",
                  "HUMAN-RESOURCE",
                  "IT/MARKETING",
                  "SUPPORTING-STAFF",
                ]}
                selectPlaceholder={"Choose Department"}
              />
              <FormSelect
                control={form.control}
                name={"designation"}
                formlabel={"Designation"}
                width={"w-[300px]"}
                selectValue={[
                  " Academic-Counsellor ",
                  " Administrator ",
                  " Business-Development-Associate ",
                  " Content-Creator ",
                  " Content-Writer ",
                  " Data-Analyst ",
                  " Director-Of-Admission & Marketing ",
                  " Field-Executive ",
                  " Graphic Designer & Content Creator ",
                  " Head-Of-Medical-Counselling&Training ",
                  " Head-of-Operation ",
                  " Web-Developer ",
                  " Team-Leader",
                ]}
                selectPlaceholder={"Choose Degisnation"}
              />
              <FormInput
                control={form.control}
                name={"email"}
                formlabel={"Email"}
                type="email"
                width={"w-80"}
              />
              <FormInput
                control={form.control}
                name={"password"}
                formlabel={"Password"}
                type="password"
                width={"w-80"}
              />
              <FormSelect
                control={form.control}
                name={"role"}
                formlabel={"Role"}
                selectValue={["Admin", "Manager", "Employee"]}
                selectPlaceholder={"Choose Role"}
                width={"w-[300px]"}
              />
              <FormSelect
                control={form.control}
                name={"office"}
                formlabel={"Office"}
                selectValue={["Delhi", "Bangalore"]}
                selectPlaceholder={"Choose Office"}
                width={"w-[300px]"}
              />
            </div>
            <h1 className="font-bold text-[1.2rem] mt-10">
              Bank Details of Employee
            </h1>
            <div className=" m-5 flex flex-wrap gap-5 w-full mb-10">
              <FormInput
                control={form.control}
                name={"bankAccountNumber"}
                formlabel={"Account Number"}
                type="number"
                width={"w-80"}
              />
              <FormInput
                control={form.control}
                name={"bankIFSCCode"}
                formlabel={"IFSC CODE"}
                type="text"
                width={"w-80"}
              />
              <FormInput
                control={form.control}
                name={"bankName"}
                formlabel={"Bank Name"}
                type="text"
                width={"w-80"}
              />
              <FormInput
                control={form.control}
                name={"state"}
                formlabel={"State"}
                type="text"
                width={"w-80"}
              />
              <FormInput
                control={form.control}
                name={"panNumber"}
                formlabel={"PAN Number"}
                type="text"
                width={"w-80"}
              />
              <div className="w-80  flex justify-between flex-col">
                <label>Upload pancard Pic</label>
                <UploadImage
                  buttonName={"Upload Pancard"}
                  handleImage={setPanCardImage}
                  classValue={
                    "border p-2 font-bold bg-white-100 text-black rounded-sm"
                  }
                />
              </div>
              <FormInput
                control={form.control}
                name={"aadharNumber"}
                formlabel={"Aadhar Number"}
                type="number"
                width={"w-80"}
              />
              <div className="w-80  flex justify-between flex-col">
                <label>Upload Aadhaar Pic</label>
                <UploadImage
                  buttonName={"Upload Aadhaar Card"}
                  handleImage={setAadharImage}
                  classValue={
                    "border p-2 font-bold bg-white-100 text-black rounded-sm"
                  }
                />
              </div>

              <FormInput
                control={form.control}
                name={"emergencyContactNumber"}
                formlabel={"Emergency Contact Number (Relative)"}
                type="text"
                width={"w-80"}
              />
              <div className="w-80  flex justify-between flex-col">
                <label>Upload Relative Aadhaar card Pic</label>
                <UploadImage
                  buttonName={"Upload Aadhaar Card"}
                  handleImage={setRelativeAadhaarImage}
                  classValue={
                    "border p-2 font-bold bg-white-100 text-black rounded-sm"
                  }
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-12 flex justify-center items-center"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddEmployee;
