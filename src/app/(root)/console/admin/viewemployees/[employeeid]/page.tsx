"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { IEmployee, IEmployeeWithEdits } from "@/types/modals.types";
import UploadImage from "@/components/UploadImage";
import ProtectedRoute from "@/components/ProtectedRoute";

interface CloudinaryUploadWidgetInfo {
  public_id: string;
  secure_url: string;
  url: string;
  [key: string]: any;
}

const SingleEmployee = () => {
  const { employeeid } = useParams<{ employeeid: string }>();
  const [exited, setexited] = useState(false);
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
        setSingleEmployeeInfo(res.data.responseBody);
        setFormData(res.data.responseBody);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [employeeid]);

  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

  const exitedEmployee = () => {
    const confirmDelete = confirm(
      `Are you sure, you want to ${exited ? "Rejoin" : "Exit"} this employee?`
    );

    if (exited) {
      formData.employeeExited = false;
    } else {
      formData.employeeExited = true;
    }

    if (confirmDelete) {
      axios
        .patch(`/api/employees/${employeeid}`, formData)
        .then((res) => {
          setSingleEmployeeInfo(res.data.responseBody);
          setIsEditing(false);
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
      <ProtectedRoute allowedRoles={["Admin"]}>
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
              className="w-full flex flex-wrap gap-2 justify-center items-center "
              onSubmit={handleEditSubmit}
            >
              <div className="flex justify-center  gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Change Image</label>
                <UploadImage
                  buttonName={"Change profile Image"}
                  handleImage={setProfileImage}
                  classValue={
                    "border p-2 bg-white text-left text-black rounded-sm h-[3.5rem] w-full"
                  }
                />
              </div>
              <div className="flex justify-center  gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Change Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleEditChange}
                  className="border p-4 w-full bg-white rounded-md"
                  placeholder="Full Name"
                />
              </div>

              <div className="flex justify-center  gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Change Designation</label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleEditChange}
                  className="border p-4 w-full bg-white rounded-md"
                >
                  <option value="Academic-Counsellor">
                    Academic-Counsellor
                  </option>
                  <option value="Administrator">Administrator</option>
                  <option value="Business-Development-Associate">
                    Business-Development-Associate
                  </option>
                  <option value="Content-Creator">Content-Creator</option>
                  <option value="Content-Writer">Content-Writer</option>
                  <option value="Data-Analyst">Data-Analyst</option>
                  <option value="Director-Of-Admission & Marketing">
                    Director-Of-Admission & Marketing
                  </option>
                  <option value="Field-Executive">Field-Executive</option>
                  <option value="Graphic Designer & Content Creator">
                    Graphic Designer & Content Creator
                  </option>
                  <option value="Head-Of-Medical-Counselling&Training">
                    Head-Of-Medical-Counselling&Training
                  </option>
                  <option value="Motion Graphic Designer">
                    Motion Graphic Designer
                  </option>
                  <option value="Content Marketing">Content Marketing</option>
                  <option value="Head-of-Operation">Head-of-Operation</option>
                  <option value="Web-Developer">Web-Developer</option>
                  <option value="Maid">Maid</option>
                  <option value="House keeping">House keeping</option>
                  <option value="PPC specialist">PPC specialist</option>
                  <option value="SEO Executive">SEO Executive</option>
                  <option value="Executive">Executive</option>
                  <option value="Receptionist">Receptionist</option>
                  <option value="Finance Manager">Finance Manager</option>
                  <option value="Team-Leader">Team-Leader</option>
                </select>
              </div>

              <div className="flex justify-center  gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Change Address</label>
                <input
                  type="text"
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={handleEditChange}
                  className="border p-4 w-full bg-white rounded-md"
                  placeholder="Full Address"
                />
              </div>

              <div className="flex justify-center  gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Change Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleEditChange}
                  className="border p-4 w-full bg-white rounded-md"
                  placeholder="Email"
                />
              </div>

              <div className="flex justify-center  gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Change Department</label>
                <select
                  name="department"
                  value={formData.department}
                  className="border p-4 w-full bg-white rounded-md"
                  onChange={handleEditChange}
                >
                  <option value="COUNSELLING/SALES">COUNSELLING/SALES</option>
                  <option value="HUMAN-RESOURCE">HUMAN-RESOURCE</option>
                  <option value="IT/MARKETING">IT/MARKETING</option>
                  <option value="SUPPORTING-STAFF">SUPPORTING-STAFF</option>
                </select>
              </div>

              {/* Add other input fields similarly */}

              <div className="flex justify-center  gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Change EmployeeID</label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleEditChange}
                  className="border p-4 w-full bg-white rounded-md"
                  placeholder="Employee ID"
                />
              </div>

              <div className="flex justify-center  gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Change Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  className="border p-4 w-full bg-white rounded-md"
                  onChange={handleEditChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="flex justify-center  gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Change Birthday</label>
                <input
                  type="date"
                  name="birthDate"
                  value={
                    formData.birthDate
                      ? new Date(formData.birthDate).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleEditChange}
                  className="border p-4 w-full  bg-white rounded-md"
                  placeholder="Birth Date"
                />
              </div>

              <div className="flex justify-center gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Change maritalStatus</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  className="border p-4 w-full bg-white rounded-md"
                  onChange={handleEditChange}
                >
                  <option value="Married">Married</option>
                  <option value="Unmarried">Unmarried</option>
                </select>
              </div>

              <div className="flex justify-center gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Change mobile Number</label>
                <input
                  type="number"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleEditChange}
                  className="border p-4 w-full bg-white rounded-md"
                  placeholder="Mobile Number"
                />
              </div>

              <div className="flex justify-center gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Reason for Exit</label>
                <input
                  type="text"
                  name="reasonForExit"
                  value={formData.reasonForExit}
                  onChange={handleEditChange}
                  className="border p-4 w-full bg-white rounded-md"
                  placeholder="Reason for Exit"
                />
              </div>

              <div className="flex justify-center gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Change Joining Date</label>
                <input
                  type="date"
                  name="joinDate"
                  value={
                    formData.joinDate
                      ? new Date(formData.joinDate).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleEditChange}
                  className="border p-4 w-full bg-white rounded-md"
                  placeholder="Joining Date"
                />
              </div>

              <div className="flex justify-center gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Change Leave Date</label>
                <input
                  type="date"
                  name="leaveDate"
                  value={
                    formData.leaveDate &&
                    formData.leaveDate.toLowerCase() !== "null"
                      ? new Date(formData.leaveDate).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleEditChange}
                  className="border p-4 w-full bg-white rounded-md"
                  placeholder="Leave Date"
                />
              </div>

              <div className="flex justify-center gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Change Bank Account Number</label>

                <input
                  type="number"
                  name="bankAccountNumber"
                  value={formData.bankAccountNumber}
                  onChange={handleEditChange}
                  className="border p-4 w-full bg-white rounded-md"
                  placeholder="Bank Account Number"
                />
              </div>

              <div className="flex justify-center gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Change bankIFSCCode</label>
                <input
                  type="text"
                  name="bankIFSCCode"
                  value={formData.bankIFSCCode}
                  onChange={handleEditChange}
                  className="border p-4 w-full bg-white rounded-md"
                  placeholder="Bank IFSC Code"
                />
              </div>

              <div className="flex justify-center gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Change bankName</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleEditChange}
                  className="border p-4 w-full bg-white rounded-md"
                  placeholder="Bank Name"
                />
              </div>

              <div className="flex justify-center gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Change Pan Number</label>
                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleEditChange}
                  className="border p-4 w-full bg-white rounded-md"
                  placeholder="PAN Number"
                />
              </div>

              <div className="flex justify-center gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Change Aadhar Number</label>
                <input
                  type="number"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleEditChange}
                  className="border p-4 w-full bg-white rounded-md"
                  placeholder="Aadhar Number"
                />
              </div>

              <div className="flex justify-center gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Change State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleEditChange}
                  className="border p-4 w-full bg-white rounded-md"
                  placeholder="State"
                />
              </div>
              <div className="flex justify-center gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Change E.Contact Number</label>
                <input
                  type="number"
                  name="emergencyContactNumber"
                  value={formData.emergencyContactNumber}
                  onChange={handleEditChange}
                  className="border p-4 w-full bg-white rounded-md"
                  placeholder="Emergency Contact Number"
                />
              </div>
              <div className="flex justify-center gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Change Aadhaar Image</label>
                <UploadImage
                  buttonName={"Change Aadhaar Image"}
                  handleImage={setAadharImage}
                  classValue={
                    "border p-2 bg-white text-left text-black rounded-sm h-[3.5rem]"
                  }
                />
              </div>
              <div className="flex justify-center gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">Change Pancard Image</label>
                <UploadImage
                  buttonName={"Change Pancard Image"}
                  handleImage={setPanCardImage}
                  classValue={
                    "border p-2 bg-white text-left text-black rounded-sm h-[3.5rem]"
                  }
                />
              </div>
              <div className="flex justify-center gap-2 sm:w-[30%] flex-col">
                <label className="font-bold">
                  Change Relateive Aadhaar Image
                </label>
                <UploadImage
                  buttonName={"Change relative Aadhaar Image"}
                  handleImage={setRelativeAadhaarImage}
                  classValue={
                    "border p-2 bg-white text-left text-black rounded-sm h-[3.5rem]"
                  }
                />
              </div>

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
                  <span className="font-bold">
                    {singleEmployeeInfo.fullName}
                  </span>
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
                  Password -{" "}
                  <span className="font-bold">
                    {singleEmployeeInfo.password}
                  </span>
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
                  <span className="font-bold">
                    {singleEmployeeInfo.bankName}
                  </span>
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
              className="bg-gradient-to-r from-transparent to-green-500 hover:bg-green-900 text-white text-[1.2rem] w-40 p-5"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
            <Button
              className="bg-gradient-to-r from-transparent to-blue-500 hover:bg-red-900 text-white text-[1.2rem] w-40 p-5"
              onClick={() => {
                setexited(!exited), exitedEmployee();
              }}
            >
              Exit Employee
            </Button>
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default SingleEmployee;
