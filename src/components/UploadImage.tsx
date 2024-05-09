import { CldUploadWidget } from "next-cloudinary";
import React from "react";

interface uploadProps {
  buttonName: string;
  handleImage: React.Dispatch<React.SetStateAction<any>>;
  classValue: string;
}

const UploadImage: React.FC<uploadProps> = ({
  buttonName,
  handleImage,
  classValue,
}) => {
  console.log(classValue, "ClassVaue");

  return (
    <>
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={(result, { widget }) => {
          if (typeof result?.info === "object") {
            handleImage(result?.info);
          }
          widget.close();
        }}
      >
        {({ open }) => {
          function handleOnClick() {
            handleImage(undefined);
            open();
          }
          return (
            <button
              className={`${classValue}`}
              // className="bg-white text-black"
              onClick={handleOnClick}
              type="button"
            >
              {buttonName}
            </button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default UploadImage;
