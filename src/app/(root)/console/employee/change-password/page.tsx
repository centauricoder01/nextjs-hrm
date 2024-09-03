"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/FormInput";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import ProtectedRoute from "@/components/ProtectedRoute";

interface localStorageValue {
  id: string;
}

const formSchema = z.object({
  currentPassword: z
    .string()
    .trim()
    .refine((value) => value !== "", {
      message: "Current Password is required",
    }),
  password: z
    .string()
    .trim()
    .refine((value) => value !== "", {
      message: "New Password is required",
    }),
});

const ChangePassword = () => {
  const { toast } = useToast();
  const [employeeId, setEmployeeId] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.currentPassword === "" || values.password === "") {
      return toast({
        title: "Empty Values",
        description: `Please provide both the Values.`,
        variant: "destructive",
      });
    }

    axios
      .patch(`/api/change-password/${employeeId}`, values)
      .then((res) => {
        toast({
          title: "Message",
          description: `${res.data.message}`,
          className: "border bg-green-300",
        });
        form.reset({
          currentPassword: "",
          password: "",
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Message",
          description: `Some Error came, Please try again after some time`,
          variant: "destructive",
        });
      });
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("Employee_Info");
      if (storedData) {
        const employeeInfo: localStorageValue = JSON.parse(storedData);
        setEmployeeId(employeeInfo.id);
      }
    }
  }, []);

  return (
    <>
      <ProtectedRoute allowedRoles={["Employee", "Manager"]}>
        <Navbar />
        <main className="flex mt-2 flex-col items-center justify-center gap-4 p-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-4 rounded-md backdrop-blur h-auto shadow-2xl m-1 w-full md:w-1/2 lg:w-1/3"
            >
              <div>
                <p className="text-[2rem] font-bold text-center w-full">
                  Create New Password
                </p>
              </div>

              <FormInput
                control={form.control}
                name={"currentPassword"}
                formlabel={"Current Password"}
                type="text"
                width={"w-full"}
              />
              <FormInput
                control={form.control}
                name={"password"}
                formlabel={"New Password"}
                type="text"
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
    </>
  );
};

export default ChangePassword;
