"use client";
import React, { useEffect, useState } from "react";
import Location from "@/components/Location";
import Camera from "@/components/Camera";
import DateTime from "@/components/DateTime";
import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

const formSchema = z.object({
  employeeId: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
});

const Attendence = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeId: "",
    },
  });

  const [getLocation, setGetLocation] = useState();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const mainObject = {
      image: "cameraImage",
      location: getLocation,
      employId: values.employeeId,
    };

    axios
      .post("/api/employees", "cameraImage")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="dark flex min-h-screen flex-col items-center justify-center p-2 bg-zinc-400">
      <DateTime />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 p-4 rounded-md backdrop-blur h-96 shadow-2xl m-1 w-full md:w-1/2 lg:w-1/3 bg-white"
        >
          <div>
            <p className="text-[2rem]  font-bold text-center w-full">
              Attendence
            </p>
          </div>
          <FormField
            control={form.control}
            name="employeeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Employee Id </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Location takelocation={setGetLocation} />

          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          >
            {({ open }) => {
              return (
                <button
                  className="border p-2 rounded-sm bg-blue-600 text-white"
                  onClick={() => open()}
                >
                  Take a Selfie 🤳
                </button>
              );
            }}
          </CldUploadWidget>
          <Button
            type="submit"
            className="w-full h-12 flex justify-center items-center bg-green-900 hover:bg-green-700 text-white"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Attendence;
