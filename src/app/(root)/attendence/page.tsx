"use client"
import React, { useEffect } from 'react';
import Location from '@/components/Location';
import Camera from '@/components/Camera';
import DateTime from '@/components/DateTime';
import { z } from "zod";
import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
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

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    useEffect(() => {
        axios.post("api/employees", { name: "Rajendra Patel", role: "CEO" }).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <div className="dark flex min-h-screen flex-col items-center justify-center p-2 bg-zinc-400">
            <DateTime />
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 rounded-md backdrop-blur h-96 shadow-2xl m-1 w-full md:w-1/2 lg:w-1/3 bg-white" >
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
                    <Location />
                    <Dialog>
                        <DialogTrigger className='border p-2 rounded-lg'>Take a Selfie 🤳</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Let me Click a Beautiful Picture of Yours!</DialogTitle>
                                <Camera />
                                <DialogClose asChild>
                                    <Button type="button" className='border p-2 bg-green-400 m-2 hover:bg-green-700 text-white' variant="secondary">
                                        Looks Good, Selected!
                                    </Button>
                                </DialogClose>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    <Button type="submit" className="w-full h-12 flex justify-center items-center bg-green-900 hover:bg-green-700 text-white">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default Attendence