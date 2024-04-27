"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { employeeDetailValidation } from "@/zod-validation/zod-validation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";

const AddEmployee = () => {
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
      emergencyContactNumber: 0,
    },
  });

  function onSubmit(values: z.infer<typeof employeeDetailValidation>) {
    console.log(values);
  }
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-start items-center border bg-blue-300 m-5 p-5 rounded-md">
        <h1 className="text-[2rem] font-bold">Add Employee</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" m-5 flex flex-wrap gap-5 w-full">
              <FormInput
                control={form.control}
                name={"employeeId"}
                formlabel={"Employee ID"}
                type="text"
              />
              <FormInput
                control={form.control}
                name={"profileImage"}
                formlabel={"Profile Image"}
                type="file"
              />
              <FormSelect
                control={form.control}
                name={"gender"}
                formlabel={"Gender"}
                selectValue={["Male", "Female", "Others"]}
                selectPlaceholder={"Choose Gender"}
              />
              <FormInput
                control={form.control}
                name={"fullName"}
                formlabel={"Full Name"}
                type="text"
              />
              <FormInput
                control={form.control}
                name={"birthDate"}
                formlabel={"Date of Birth"}
                type="date"
              />
              <FormSelect
                control={form.control}
                name={"maritalStatus"}
                formlabel={"Marital Status"}
                selectValue={["Married", "Unmarried"]}
                selectPlaceholder={"Choose Marital Status"}
              />
              <FormInput
                control={form.control}
                name={"mobileNumber"}
                formlabel={"Mobile Number"}
                type="number"
              />
              <FormInput
                control={form.control}
                name={"fullAddress"}
                formlabel={"Full Address"}
                type="text"
              />
              <FormInput
                control={form.control}
                name={"joinDate"}
                formlabel={"Joining Date"}
                type="date"
              />
              <FormInput
                control={form.control}
                name={"leaveDate"}
                formlabel={"Leaving Date"}
                type="date"
              />
              <FormInput
                control={form.control}
                name={"reasonForExit"}
                formlabel={"Reason For Exit"}
                type="text"
              />
              <FormSelect
                control={form.control}
                name={"department"}
                formlabel={"Department"}
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
              />
              <FormInput
                control={form.control}
                name={"password"}
                formlabel={"Password"}
                type="password"
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
              />
              <FormInput
                control={form.control}
                name={"bankIFSCCode"}
                formlabel={"IFSC CODE"}
                type="text"
              />
              <FormInput
                control={form.control}
                name={"bankName"}
                formlabel={"Bank Name"}
                type="text"
              />
              <FormInput
                control={form.control}
                name={"panNumber"}
                formlabel={"PAN Number"}
                type="text"
              />
              <FormInput
                control={form.control}
                name={"aadharNumber"}
                formlabel={"Aadhar Number"}
                type="number"
              />
              <FormInput
                control={form.control}
                name={"state"}
                formlabel={"State"}
                type="text"
              />
              <FormInput
                control={form.control}
                name={"emergencyContactNumber"}
                formlabel={"Emergency Contact Number"}
                type="text"
              />
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
