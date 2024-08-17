import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const body = await req.json();
    const { image } = body;
    if (!image) {
      return NextResponse.json(
        { success: false, message: "No image provided" },
        { status: 400 }
      );
    }
    // Define the directory path for saving images
    const directoryPath = path.join(process.cwd(), "public", "attendenceImage");

    // Create the directory if it doesn't exist
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    // Generate a unique file name
    const fileName = `image-${uuidv4()}.jpeg`;

    // Define the full path for the image
    const filePath = path.join(directoryPath, fileName);

    // Remove the data URL part and keep the actual image data
    const base64Image = image.split(";base64,").pop();

    // Save the image to the defined path
    fs.writeFile(filePath, base64Image, { encoding: "base64" }, (err) => {
      if (err) {
        console.error("Error saving image:", err);
        return NextResponse.json(
          {
            success: false,
            message: "some error occured",
            error: err,
          },
          { status: 500 }
        );
      }
    });

    return NextResponse.json(
      { success: true, message: "Image saved successfully", filePath },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
