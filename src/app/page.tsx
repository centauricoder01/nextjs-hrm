"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import planEduImage from "../../public/planedu.png";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const formSchema = z.object({
  email: z.string().email().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function Home() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    axios
      .post("/api/authtication", values)
      .then((res) => {
        toast({
          title: "Login Successfull",
          description: `${res.data.responseBody.fullName}, Welcome to the Dashboard`,
        });
        localStorage.setItem(
          "Employee_Info",
          JSON.stringify(res.data.responseBody)
        );
        if (
          res.data.responseBody.role === "Employee" ||
          res.data.responseBody.role === "Manager"
        ) {
          setLoading(false);
          router.push("/console/employee/employee-dashboard");
        } else {
          setLoading(false);
          router.push("/console");
        }
      })
      .catch((err) => {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Login Successfull",
          description: `Sorry Sir/Mam, You got an Error. Please enter Correct Info`,
        });
        console.log(err);
      });
  }

  return (
    <main className="dark flex min-h-screen flex-col items-center  justify-center gap-4 p-2 bg-[url('../../public/e.png')] inset-0 bg-no-repeat bg-cover bg-center text-zinc-50">
      <div>
        <Image src={planEduImage} alt="PlanEdu Image" width={200} />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 p-4 rounded-md backdrop-blur h-96 shadow-2xl m-1 w-full md:w-1/2 lg:w-1/3"
        >
          <div>
            <p className="text-[2rem]  font-bold text-center w-full">LOGIN</p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link href="/" as="/">
            <p className="mt-5">Forgot Your Id/Password!</p>
          </Link>
          <Button
            type="submit"
            className="w-full h-12 flex justify-center items-center"
          >
            {loading ? <LoadingSpinner /> : "Submit"}
          </Button>
        </form>
      </Form>
      <div className="flex justify-center items-center gap-10 ">
        <div
          onClick={() => router.push("/attendence")}
          className="border p-4 cursor-pointer rounded-lg bg-cyan-800 w-[100%]"
        >
          <p>Employee Attendance </p>
        </div>
      </div>
    </main>
  );
}
