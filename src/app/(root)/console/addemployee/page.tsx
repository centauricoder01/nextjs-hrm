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

const AddEmployee = () => {
  const form = useForm<z.infer<typeof employeeDetailValidation>>({
    resolver: zodResolver(employeeDetailValidation),
    defaultValues: {
      employeeId: "",
      gender: "",
      fullName: "",
      birthDate: new Date(),
      maritalStatus: false,
      mobileNumber: 0,
      fullAddress: "",
      joinDate: new Date(),
      leaveDate: new Date(),
      reasonForExit: "",
      department: "",
      designation: "",
      email: "",
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
    console.log("I am calling from the Onsubmit");
    console.log(values);
  }
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-start items-center border bg-blue-300 m-5 p-5 rounded-md">
        <h1 className="text-[2rem] font-bold">Add Employee</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" m-5 flex flex-wrap gap-5 w-full"
          >
            <FormInput
              control={form.control}
              name={"employeeId"}
              formlabel={"Employee ID"}
              type="text"
            />
            <FormInput
              control={form.control}
              name={"employeeId"}
              formlabel={"Employee ID"}
              type="text"
            />
            <FormInput
              control={form.control}
              name={"employeeId"}
              formlabel={"Employee ID"}
              type="text"
            />
            <FormInput
              control={form.control}
              name={"employeeId"}
              formlabel={"Employee ID"}
              type="text"
            />
            <FormInput
              control={form.control}
              name={"employeeId"}
              formlabel={"Employee ID"}
              type="text"
            />
            <FormInput
              control={form.control}
              name={"employeeId"}
              formlabel={"Employee ID"}
              type="text"
            />
            <FormInput
              control={form.control}
              name={"employeeId"}
              formlabel={"Employee ID"}
              type="text"
            />
            <FormInput
              control={form.control}
              name={"employeeId"}
              formlabel={"Employee ID"}
              type="text"
            />
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
