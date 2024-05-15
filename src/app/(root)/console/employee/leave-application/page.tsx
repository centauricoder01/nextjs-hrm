"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React from "react";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSelect from "@/components/FormSelect";
import FormInput from "@/components/FormInput";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  leaveType: z
    .string()
    .trim()
    .refine((value) => value !== "", {
      message: "Leave Type is required",
    }),
  reason: z
    .string()
    .trim()
    .refine((value) => value !== "", {
      message: "Reason is required",
    }),
  startingDate: z.coerce.date().refine((date) => date !== null, {
    message: "Starting Date is required",
  }),
  endDate: z.coerce.date().refine((date) => date !== null, {
    message: "Ending Date is required",
  }),
});

const Leave_Application = () => {
  const { toast } = useToast();
  const today = new Date();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leaveType: "",
      reason: "",
      startingDate: today,
      endDate: today,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, "This is Values");
    toast({
      title: "Application Successfull",
      description: `HR Will contact to you sooner...`,
    });
  }
  return (
    <>
      <Navbar />
      <main className=" flex mt-2 flex-col items-center  justify-center gap-4 p-2 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 p-4 rounded-md backdrop-blur h-auto shadow-2xl m-1 w-full md:w-1/2 lg:w-1/3"
          >
            <div>
              <p className="text-[2rem]  font-bold text-center w-full">
                Apply For Leave
              </p>
            </div>

            <FormSelect
              control={form.control}
              name={"leaveType"}
              formlabel={"Leave Type"}
              selectValue={[
                "Sick Leave",
                "Casual Leave",
                "Privilege Leave",
                "Half Day Leave",
                "Quater (1/4) Leave",
                "Compensate leave",
              ]}
              selectPlaceholder={"Choose Type"}
              width={"w-full"}
            />
            <FormInput
              control={form.control}
              name={"reason"}
              formlabel={"Reason"}
              type="text"
              width={"w-full"}
            />
            <FormInput
              control={form.control}
              name={"startingDate"}
              formlabel={"Starting Date "}
              type="date"
              width={"w-full"}
            />
            <FormInput
              control={form.control}
              name={"endDate"}
              formlabel={"Ending Date "}
              type="date"
              width={"w-full"}
            />
            <Button
              type="submit"
              className="w-full h-12 flex justify-center items-center"
            >
              Submit
            </Button>
          </form>
        </Form>
      </main>
    </>
  );
};

export default Leave_Application;
