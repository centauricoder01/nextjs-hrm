"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSelect from "@/components/FormSelect";
import FormInput from "@/components/FormInput";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";

interface localStorageValue {
  id: string;
}

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
  startingDate: z.string().refine((value) => value !== "", {
    message: "Starting Date is required",
  }),
  endingDate: z.string().refine((value) => value !== "", {
    message: "Ending Date is required",
  }),
  userId: z.string(),
});

const Leave_Application = () => {
  const { toast } = useToast();
  const today = new Date().toISOString();
  const [employeeUserId, setEmployeeUserId] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leaveType: "",
      reason: "",
      startingDate: today,
      endingDate: today,
      userId: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { startingDate, endingDate } = values;

    // Convert the date strings to full ISO 8601 format
    const startDateISO = new Date(startingDate).toISOString();
    const endDateISO = new Date(endingDate).toISOString();

    values.startingDate = startDateISO;
    values.endingDate = endDateISO;
    values.userId = employeeUserId;

    if (
      values.startingDate === values.endingDate &&
      values.leaveType !== "Halfday Leave" &&
      values.leaveType !== "Quater (1/4) Leave"
    ) {
      return toast({
        title: "Same Date Not Allowed",
        description: `Starting Date and Ending Date are the same. Please increase the ending date by 1 or more.`,
        variant: "destructive",
      });
    }

    console.log(values);
    axios
      .post("/api/leave-applications", values)
      .then((res) => {
        toast({
          title: "Message",
          description: `${res.data.message}`,
          className: "border bg-green-300",
        });
        form.reset({
          leaveType: "",
          reason: "",
          startingDate: today,
          endingDate: today,
          userId: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("Employee_Info");
      if (storedData) {
        const employeeInfo: localStorageValue = JSON.parse(storedData);
        setEmployeeUserId(employeeInfo.id);
      }
    }
  }, []);

  return (
    <ProtectedRoute allowedRoles={["Employee", "Manager"]}>
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
                "Causal Leave",
                "Privilege Leave",
                "Halfday Leave",
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
              name={"endingDate"}
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
    </ProtectedRoute>
  );
};

export default Leave_Application;
