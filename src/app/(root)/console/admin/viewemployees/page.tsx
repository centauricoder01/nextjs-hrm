"use client";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface EmployeeBluePrint {
  _id: string;
  profileImage: string;
  fullName: string;
  employeeId: string;
  designation: string;
  department: string;
  employeeExited: boolean;
}

const ViewEmployees = () => {
  const [employees, setEmployees] = useState<EmployeeBluePrint[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);

  useEffect(() => {
    axios
      .get("/api/employees")
      .then((res) => {
        setEmployees(res.data.responseBody);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
    setCurrentPage(1); // Reset to first page on new filter
  };

  const filteredEmployees = employees
    .filter(
      (employee) =>
        employee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedDepartment === "All" ||
          employee.department === selectedDepartment) &&
        (selectedStatus === "All" ||
          (selectedStatus === "Working" && !employee.employeeExited) ||
          (selectedStatus === "Exited" && employee.employeeExited))
    )
    .sort((a, b) => a.fullName.localeCompare(b.fullName));

  // Get current employees
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <div className="bg-[#c3eeff] m-5 p-5 rounded-md">
        <div className="sm:text-left text-center">
          <h1 className="font-bold mb-5 text-[2rem]">
            All Employees {filteredEmployees.length}
          </h1>
        </div>

        <div className="flex justify-between items-center gap-5">
          <Input
            className="w-full mb-5 mt-5 bg-white"
            placeholder="Search Employee"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="w-full mb-5 mt-5 bg-white h-12 rounded"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
          >
            <option value="All">All Departments</option>
            <option value="IT/MARKETING">IT/MARKETING</option>
            <option value="SUPPORTING-STAFF">SUPPORTING-STAFF</option>
            <option value="HUMAN-RESOURCE">HUMAN-RESOURCE</option>
            <option value="COUNSELLING/SALES">COUNSELLING/SALES</option>
          </select>

          <select
            className="w-full mb-5 mt-5 bg-white h-12 rounded"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All" className="bolder">
              <strong>All Employees</strong>
            </option>
            <option value="Working">
              <strong>Working</strong>
            </option>
            <option value="Exited">
              <strong>Exited</strong>
            </option>
          </select>

          <button
            className="border bg-green-800 rounded-lg shadow-slate-500 text-white p-2.5 hover:bg-green-600"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {currentEmployees.map((employee, i) => (
          <div
            key={i}
            className="border flex flex-col justify-between sm:flex-row items-center p-2 rounded-md bg-white shadow-2xl mb-4"
          >
            <Image
              src={employee.profileImage}
              width={70}
              height={10}
              className="rounded-full mb-2 h-[4rem]"
              alt="Avatar"
            />

            <p className="font-bold mb-2">{employee.fullName}</p>
            <p className="font-bold mb-2">{employee.designation}</p>
            <p className="font-bold mb-2">{employee.department}</p>
            <p className="font-bold mb-2">{employee.employeeId}</p>
            <Link
              href={`/console/admin/viewemployees/${employee._id}`}
              passHref
            >
              <p className="font-bold text-blue-500 hover:underline">
                View Full Detail
              </p>
            </Link>
          </div>
        ))}

        <Pagination
          employeesPerPage={employeesPerPage}
          totalEmployees={filteredEmployees.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

interface PaginationProps {
  employeesPerPage: number;
  totalEmployees: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  employeesPerPage,
  totalEmployees,
  paginate,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalEmployees / employeesPerPage);

  return (
    <div className="flex justify-center mt-4">
      <nav>
        <ul className="pagination flex space-x-2 items-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              onClick={() => paginate(currentPage - 1)}
              className="page-link px-3 py-1 border rounded-lg bg-blue-500 text-white hover:bg-blue-800"
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          <li className="page-number px-3 py-1">
            Page {currentPage} of {totalPages}
          </li>
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              onClick={() => paginate(currentPage + 1)}
              className="page-link px-3 py-1 border rounded-lg bg-blue-500 text-white hover:bg-blue-800"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ViewEmployees;
