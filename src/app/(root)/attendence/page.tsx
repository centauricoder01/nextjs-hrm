"use client";
import React, { useState } from "react";
import Location from "@/components/Location";
import DateTime from "@/components/DateTime";
import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
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
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import ImageCapture from "@/components/ImageCapture";
import Image from "next/image";

// TYPE INFERENCES
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
  const [imageUrl, setImageUrl] = useState<string>("");

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (url: string) => {
    setImageUrl(url); // Set the image URL received from the child component
  };

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attendenceOption: "",
      employeeId: "",
    },
  });

  const [getLocation, setGetLocation] = useState<string | undefined>(undefined);

  const currentDate = new Date();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const mainObject: MainObject = {
      date: currentDate.toISOString().split("T")[0],
      employId: values.employeeId,
      location: getLocation,
      selfie: imageUrl,
      attendanceOption: values.attendenceOption,
    };

    function hasEmptyValues(obj: MainObject): boolean {
      return Object.values(obj).some((value) => !value);
    }

    if (hasEmptyValues(mainObject)) {
      setLoading(false);
      return toast({
        title: "Error",
        description: "Please Enter All the Values",
        variant: "destructive",
      });
    }

    if (values.attendenceOption === "TimeIn") {
      mainObject.timeIn = currentDate.toLocaleTimeString();
    } else if (values.attendenceOption === "TimeOut") {
      mainObject.timeOut = currentDate.toLocaleTimeString();
    }

    try {
      const endpoint = values.attendenceOption === "TimeIn" ? "post" : "patch";
      const response = await axios[endpoint]("/api/attendence", mainObject);

      toast({
        title:
          values.attendenceOption === "TimeIn"
            ? "TimeIn Message"
            : "TimeOut Message",
        description: response.data.message,
      });

      router.push("/");
    } catch (err: any) {
      toast({
        title: "Error Occurred",
        variant: "destructive",
        description: err.response.data.message,
      });
    } finally {
      setLoading(false);
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
          {/* <UploadImage
            buttonName={"Upload Image"}
            handleImage={setResource}
            classValue={
              "border p-2 font-bold bg-blue-500 text-white rounded-sm w-full"
            }
          /> */}
          <ImageCapture setImage={handleImageUpload} />

          <Button
            type="submit"
            className="w-full h-12 flex justify-center items-center bg-green-900 hover:bg-green-700 text-white"
          >
            {loading ? <LoadingSpinner /> : "Submit"}
          </Button>
        </form>
      </Form>
      <Link href={"/"}>
        <Button className="mt-2 bg-white text-black">Back</Button>
      </Link>
    </div>
  );
};

export default Attendence;
