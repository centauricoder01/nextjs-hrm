import React from "react";

const BasicCartStructure = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="border w-full sm:w-[40%] md:w-[45%] h-96 overflow-y-scroll overflow-x-hidden p-2 md:p-4 rounded-md bg-white">
      {children}
    </div>
  );
};

export default BasicCartStructure;
