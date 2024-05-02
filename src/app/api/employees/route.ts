import { connect } from "@/db/db";
import { uploadOnCloudinary } from "@/helper/Cloudinary";
import { fileUpload } from "@/helper/Multer";
import EmployeeModel from "@/model/employee.model";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

interface RequestWithFiles extends Request {
  files: {
    avatar: Express.Multer.File[];
  };
}
export async function POST(request: RequestWithFiles) {
  await connect();
  try {
    const data = await request.formData();
    const file: File | null = data.get("image") as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false });
    }

    const byptes = await file.arrayBuffer();
    const buffer = Buffer.from(byptes);
    const path = `../../public/${file.name}`;

    await writeFile(path, buffer);
    console.log(`Open ${path} to see the uploaded file`);

    // const avatar = await uploadOnCloudinary(avatarLocalPath);
    // const body = await request.json();
    // const newEmployee = new EmployeeModel(body);
    // await newEmployee.save();

    return NextResponse.json(
      {
        success: true,
        responseBody: {
          url: "Hi, I am url",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error came in the employee response",
        error,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const value = await EmployeeModel.find();
    return Response.json(
      {
        success: true,
        responseBody: value,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error came in the employee response:", error);
    return Response.json(
      {
        success: false,
        message: "Error came in the employee response",
      },
      { status: 500 }
    );
  }
}
