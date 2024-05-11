import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Messages = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <>
      <Navbar />
      <div className="bg-[#c3eeff] m-5 p-5 rounded-md">
        <div className="sm:text-left text-center">
          <h1 className="font-bold mb-5 text-[2rem]">Messages (Inbox)</h1>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {arr.map((ele, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    <Image
                      src={"/dummy.jpeg"}
                      width={70}
                      height={70}
                      className="rounded-full mb-2"
                      alt="Avatar"
                    />
                  </TableCell>
                  <TableCell>Rajendra Patel</TableCell>
                  <TableCell>29 April 2024</TableCell>
                  <TableCell className="w-96">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Omnis nostrum commodi natus vitae dicta voluptatibus
                    consequatur, culpa suscipit praesentium dolor.
                  </TableCell>
                  <TableCell className="text-center ">
                    <Button className="mr-3 bg-green-500 hover:bg-green-700">
                      Reply
                    </Button>
                    <Button className="mr-3 bg-orange-500 hover:bg-orange-700">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Messages;
