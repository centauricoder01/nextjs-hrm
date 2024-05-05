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
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormSelect from "@/components/FormSelect";

// TYPE INFERENCES
interface CloudinaryUploadWidgetInfo {
  public_id: string;
  secure_url: string;
  url: string;
  [key: string]: any;
}

interface MainObject {
  date: string;
  employId: string | number;
  location: any; // Specify the actual type expected for location
  selfie?: string;
  attendanceOption: string;
  timeIn?: string;
  timeOut?: string;
}

// ZOD VALIDATION
const formSchema = z.object({
  attendenceOption: z.string().nonempty(),
  employeeId: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
});

// MAIN FUNCTION
const Attendence = () => {
  const [resource, setResource] = useState<
    CloudinaryUploadWidgetInfo | undefined
  >(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attendenceOption: "",
      employeeId: "",
    },
  });

  const [getLocation, setGetLocation] = useState<string | undefined>(undefined);

  const currentDate = new Date();
  function onSubmit(values: z.infer<typeof formSchema>) {
    const mainObject: MainObject = {
      date: currentDate.toISOString().split("T")[0],
      employId: values.employeeId,
      location: getLocation,
      selfie: resource?.url,
      attendanceOption: values.attendenceOption,
    };

    if (values.attendenceOption === "TimeIn") {
      mainObject.timeIn = currentDate.toLocaleTimeString();
    } else if (values.attendenceOption === "TimeOut") {
      mainObject.timeOut = currentDate.toLocaleTimeString();
    }

    if (values.attendenceOption === "TimeIn") {
      axios
        .post("/api/attendence", mainObject)
        .then((res) => {
          console.log(res);
          toast(res.data.message, {
            description: currentDate.toISOString(),
            action: {
              label: "Ok",
              onClick: () => console.log("Ok"),
            },
          });
        })
        .catch((err) => {
          console.log(err);
          toast(err.response.data.message);
        });
    } else {
      axios
        .patch("/api/attendence", mainObject)
        .then((res) => {
          console.log(res);
          toast(res.data.message, {
            description: currentDate.toISOString(),
            action: {
              label: "Ok",
              onClick: () => console.log("Ok"),
            },
          });
        })
        .catch((err) => {
          console.log(err);
          toast(err.response.data.message);
        });
    }
  }

  return (
    <div className="dark flex min-h-screen flex-col items-center justify-center p-2 bg-zinc-400">
      <DateTime />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 p-4 rounded-md backdrop-blur min-h-96 shadow-2xl m-1 w-full md:w-1/2 lg:w-1/3 bg-white"
        >
          <div>
            <p className="text-[2rem] font-bold text-center w-full">
              Attendence
            </p>
          </div>
          <FormSelect
            control={form.control}
            name={"attendenceOption"}
            formlabel={"Attendence Option"}
            selectValue={["TimeIn", "TimeOut"]}
            selectPlaceholder={"Choose Option"}
            width={"w-full"}
          />
          <FormField
            control={form.control}
            name="employeeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Employee Id </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-slate-200" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Location takelocation={setGetLocation} />

          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            onSuccess={(result, { widget }) => {
              if (typeof result?.info === "object") {
                setResource(result?.info);
              }
              widget.close();
            }}
          >
            {({ open }) => {
              function handleOnClick() {
                setResource(undefined);
                open();
              }
              return (
                <button
                  className="border p-2 font-bold bg-blue-500 text-white rounded-sm w-full"
                  onClick={handleOnClick}
                  type="button"
                >
                  Give a Selfie
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
