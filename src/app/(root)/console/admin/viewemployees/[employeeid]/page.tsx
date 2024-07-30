"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { IEmployee, IEmployeeWithEdits } from "@/types/modals.types";
import UploadImage from "@/components/UploadImage";

interface CloudinaryUploadWidgetInfo {
  public_id: string;
  secure_url: string;
  url: string;
  [key: string]: any;
}

const SingleEmployee = () => {
  const { employeeid } = useParams<{ employeeid: string }>();
  const router = useRouter();
  const [singleEmployeeInfo, setSingleEmployeeInfo] =
    useState<IEmployee | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  // updating the images of the div
  const [profileImage, setProfileImage] = useState<
    CloudinaryUploadWidgetInfo | undefined
  >(undefined);
  const [aadharImage, setAadharImage] = useState<
    CloudinaryUploadWidgetInfo | undefined
  >(undefined);
  const [panCardImage, setPanCardImage] = useState<
    CloudinaryUploadWidgetInfo | undefined
  >(undefined);
  const [relativeAadhaarImage, setRelativeAadhaarImage] = useState<
    CloudinaryUploadWidgetInfo | undefined
  >(undefined);
  // form data updating part start from here
  const [formData, setFormData] = useState<IEmployeeWithEdits>({
    _id: "",
    profileImage: "",
    fullName: "",
    employeeId: "",
    designation: "",
    birthDate: "",
    employeeExited: false,
    joinDate: "",
    maritalStatus: "",
    mobileNumber: 0,
    fullAddress: "",
    leaveDate: "",
    reasonForExit: "",
    department: "",
    email: "",
    bankAccountNumber: 0,
    bankIFSCCode: "",
    bankName: "",
    panNumber: "",
    aadharNumber: 0,
    state: "",
    emergencyContactNumber: 0,
    gender: "",
    role: "",
    password: "",
    aadhaarImage: "",
    pancardImage: "",
    relativeAadhaarImage: "",
  });

  useEffect(() => {
    axios
      .get(`/api/employees/${employeeid}`)
      .then((res) => {
        console.log(res.data.responseBody, "This is Response Body");
        setSingleEmployeeInfo(res.data.responseBody);
        setFormData(res.data.responseBody);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [employeeid]);

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profileImage !== undefined) {
      formData.profileImage = profileImage.secure_url;
    }
    if (aadharImage !== undefined) {
      formData.aadhaarImage = aadharImage.secure_url;
    }
    if (panCardImage !== undefined) {
      formData.pancardImage = panCardImage.secure_url;
    }
    if (relativeAadhaarImage !== undefined) {
      formData.relativeAadhaarImage = relativeAadhaarImage.secure_url;
    }

    axios
      .patch(`/api/employees/${employeeid}`, formData)
      .then((res) => {
        setSingleEmployeeInfo(res.data.responseBody);
        setIsEditing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmDelete) {
      axios
        .delete(`/api/employees/${employeeid}`)
        .then(() => {
          router.push("/console/admin/viewemployees");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (!singleEmployeeInfo) {
    return <h1>Loading...</h1>;
  }

  const birthDate = new Date(singleEmployeeInfo.birthDate);
  const joiningDate = new Date(singleEmployeeInfo.joinDate);
  const leaveDate = new Date(singleEmployeeInfo.leaveDate);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#c3eeff] m-5 p-5 rounded-md flex justify-center items-center flex-col">
        <Image
          src={singleEmployeeInfo.profileImage}
          width={200}
          height={100}
          className="rounded-sm mb-2 h-[15rem]"
          alt="employee-image"
        />

        {isEditing ? (
          <form
            className="w-full flex flex-wrap gap-2 justify-center items-center"
            onSubmit={handleEditSubmit}
          >
            <UploadImage
              buttonName={"Change profile Image"}
              handleImage={setProfileImage}
              classValue={
                "border p-2 bg-white text-left text-black rounded-sm h-[3.5rem] sm:w-[30%]"
              }
            />

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleEditChange}
              className="border p-4 w-full sm:w-[30%] bg-white rounded-md"
              placeholder="Full Name"
            />
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleEditChange}
              className="border p-4 w-full sm:w-[30%] bg-white rounded-md"
              placeholder="Designation"
            />
            <input
              type="text"
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleEditChange}
              className="border p-4 w-full sm:w-[30%] bg-white rounded-md"
              placeholder="Full Address"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleEditChange}
              className="border p-4 w-full sm:w-[30%] bg-white rounded-md"
              placeholder="Email"
            />
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleEditChange}
              className="border p-4 w-full sm:w-[30%] bg-white rounded-md"
              placeholder="Department"
            />
            {/* Add other input fields similarly */}
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleEditChange}
              className="border p-4 w-full sm:w-[30%] bg-white rounded-md"
              placeholder="Employee ID"
            />
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleEditChange}
              className="border p-4 w-full sm:w-[30%] bg-white rounded-md"
              placeholder="Gender"
            />
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleEditChange}
              className="border p-4 w-full sm:w-[30%] bg-white rounded-md"
              placeholder="Birth Date"
            />
            <input
              type="text"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleEditChange}
              className="border p-4 w-full sm:w-[30%] bg-white rounded-md"
              placeholder="Marital Status"
            />
            <input
              type="number"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleEditChange}
              className="border p-4 w-full sm:w-[30%] bg-white rounded-md"
              placeholder="Mobile Number"
            />
            <input
              type="text"
              name="reasonForExit"
              value={formData.reasonForExit}
              onChange={handleEditChange}
              className="border p-4 w-full sm:w-[30%] bg-white rounded-md"
              placeholder="Reason for Exit"
            />
            {/* <input
              type="text"
              name="reasonForExit"
              value={formData.employeeExited}
              onChange={handleEditChange}
              className="border p-4 w-full sm:w-[30%] bg-white rounded-md"
              placeholder=""
            /> */}
            <input
              type="date"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleEditChange}
              className="border p-4 w-full sm:w-[30%] bg-white rounded-md"
              placeholder="Joining Date"
            />
            <input
              type="date"
              name="leaveDate"
              value={formData.leaveDate}
              onChange={handleEditChange}
              className="border p-4 w-full sm:w-[30%] bg-white rounded-md"
              placeholder="Leave Date"
            />
            <input
              type="number"
              name="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={handleEditChange}
              className="border p-4 w-full sm:w-[30%] bg-white rounded-md"
              placeholder="Bank Account Number"
            />
            <input
              type="text"
              name="bankIFSCCode"
              value={formData.bankIFSCCode}
              onChange={handleEditChange}
              className="border p-4 w-full sm:w-[30%] bg-white rounded-md"
              placeholder="Bank IFSC Code"
            />
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleEditChange}
              className="border p-4 w-full sm:w-[30%] bg-white rounded-md"
              placeholder="Bank Name"
            />
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleEditChange}
              className="border p-4 w-full sm:w-[30%] bg-white rounded-md"
              placeholder="PAN Number"
            />
            <input
              type="number"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleEditChange}
              className="border p-4 w-full sm:w-[30%] bg-white rounded-md"
              placeholder="Aadhar Number"
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleEditChange}
              className="border p-4 w-full sm:w-[30%] bg-white rounded-md"
              placeholder="State"
            />
            <input
              type="number"
              name="emergencyContactNumber"
              value={formData.emergencyContactNumber}
              onChange={handleEditChange}
              className="border p-4 w-full sm:w-[30%] bg-white rounded-md"
              placeholder="Emergency Contact Number"
            />
            <UploadImage
              buttonName={"Change Aadhaar Image"}
              handleImage={setAadharImage}
              classValue={
                "border p-2 bg-white text-left text-black rounded-sm h-[3.5rem] sm:w-[30%]"
              }
            />
            <UploadImage
              buttonName={"Change Pancard Image"}
              handleImage={setPanCardImage}
              classValue={
                "border p-2 bg-white text-left text-black rounded-sm h-[3.5rem] sm:w-[30%]"
              }
            />
            <UploadImage
              buttonName={"Change relative Aadhaar Image"}
              handleImage={setRelativeAadhaarImage}
              classValue={
                "border p-2 bg-white text-left text-black rounded-sm h-[3.5rem] sm:w-[30%]"
              }
            />

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-900 text-white text-[1.2rem] p-3 rounded w-full sm:w-[30%]"
            >
              Save
            </button>
          </form>
        ) : (
          <>
            <div className="flex flex-wrap justify-center items-center gap-2">
              <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                EmployeeId -{" "}
                <span className="font-bold">
                  {singleEmployeeInfo.employeeId}{" "}
                </span>
              </p>
              <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                Name -{" "}
                <span className="font-bold">{singleEmployeeInfo.fullName}</span>
              </p>
              <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                Gender -{" "}
                <span className="font-bold">{singleEmployeeInfo.gender}</span>
              </p>
              <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                Birth Date -{" "}
                <span className="font-bold">
                  {birthDate.toLocaleDateString("en-US", options)}
                </span>
              </p>
              <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                Marital Status -{" "}
                <span className="font-bold">
                  {singleEmployeeInfo.maritalStatus}
                </span>
              </p>
              <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                Mobile Number -{" "}
                <span className="font-bold">
                  {singleEmployeeInfo.mobileNumber}
                </span>
              </p>
              <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                Address -{" "}
                <span className="font-bold">
                  {singleEmployeeInfo.fullAddress}
                </span>
              </p>
              <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                Joining Date -{" "}
                <span className="font-bold">
                  {joiningDate.toLocaleDateString("en-US", options)}
                </span>
              </p>
              {!singleEmployeeInfo.employeeExited ? (
                <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                  Employee status - <span className="font-bold">Working</span>
                </p>
              ) : (
                <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                  Exit Date -{" "}
                  <span className="font-bold">
                    {leaveDate.toLocaleDateString("en-US", options)}
                  </span>
                </p>
              )}

              {singleEmployeeInfo.reasonForExit === "" ? null : (
                <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                  Reason For Exit -{" "}
                  <span className="font-bold">
                    {singleEmployeeInfo.reasonForExit}
                  </span>
                </p>
              )}

              <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                Department -{" "}
                <span className="font-bold">
                  {singleEmployeeInfo.department}
                </span>
              </p>
              <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                Designation -{" "}
                <span className="font-bold">
                  {singleEmployeeInfo.designation}
                </span>
              </p>
              <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                Email -{" "}
                <span className="font-bold">{singleEmployeeInfo.email}</span>
              </p>
              <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                Password - <span className="font-bold">null</span>
              </p>
            </div>
            <h1 className="font-bold text-left m-5 text-[1.5rem]">
              Bank Details and other Info.
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-2">
              <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                Bank Account Number -{" "}
                <span className="font-bold">
                  {singleEmployeeInfo.bankAccountNumber}
                </span>
              </p>
              <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                Bank IFSC Code -{" "}
                <span className="font-bold">
                  {singleEmployeeInfo.bankIFSCCode}
                </span>
              </p>
              <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                Bank Name -{" "}
                <span className="font-bold">{singleEmployeeInfo.bankName}</span>
              </p>
              <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                PAN -{" "}
                <span className="font-bold">
                  {singleEmployeeInfo.panNumber}
                </span>
              </p>
              <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                Aadhar No -{" "}
                <span className="font-bold">
                  {singleEmployeeInfo.aadharNumber}
                </span>
              </p>
              <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                State -{" "}
                <span className="font-bold">{singleEmployeeInfo.state}</span>
              </p>
              <p className="border p-4 w-full sm:w-[30%] bg-white rounded-md">
                Emergency Contact No -{" "}
                <span className="font-bold">
                  {singleEmployeeInfo.emergencyContactNumber}
                </span>
              </p>
            </div>
            <h1 className="font-bold text-left m-5 text-[1.5rem]">
              Aadhaar and Pan Image.
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-5">
              <div className="text-center border-2 border-black rounded-sm">
                <p>Personal Aadhaar card</p>
                <Image
                  src={singleEmployeeInfo?.aadhaarImage}
                  alt="Aadhaar Image"
                  width={300}
                  height={150}
                  className="rounded-sm"
                />
              </div>
              <div className="text-center border-2 border-black rounded-sm">
                <p>Personal Pancard</p>
                <Image
                  src={singleEmployeeInfo?.pancardImage}
                  alt="Pan Image"
                  width={300}
                  height={150}
                  className="rounded-sm"
                />
              </div>
              <div className="text-center border-2 border-black rounded-sm">
                <p>Relative Aadhaar Card</p>
                <Image
                  src={singleEmployeeInfo?.relativeAadhaarImage}
                  alt="Relative Aadhaar Image"
                  width={300}
                  height={150}
                  className="rounded-sm"
                />
              </div>
            </div>
          </>
        )}
        <div className="flex justify-center items-center gap-5 mt-10">
          <Button
            className="bg-green-600 hover:bg-green-900 text-white text-[1.2rem] w-40 p-5"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-900 text-white text-[1.2rem] w-40 p-5"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default SingleEmployee;
