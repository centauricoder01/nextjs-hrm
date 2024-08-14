"use client";
import React, { useState } from "react";
import axios from "axios";

interface LocationProps {
  takelocation: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Location: React.FC<LocationProps> = ({ takelocation }) => {
  const [location, setLocation] = useState("");

  const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const query = `${position.coords.latitude},${position.coords.longitude}`;
          const apiUrl = `https://api.opencagedata.com/geocode/v1/json?key=9e38372904c045e58cfd9eef1113bf92&q=${query}`;

          try {
            axios
              .get(apiUrl)
              .then((res) => {
                console.log(res.data);
                setLocation(res.data.results[0].formatted);
                takelocation(res.data.results[0].formatted);
              })
              .catch((err) => {
                console.log(err);
              });
          } catch (error) {
            console.log(error);
          }
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    } else {
      setLocation("Allow to Access the Location");
    }
  };
  return (
    <div className="">
      <label className="border rounded-sm bg-orange-400 text-white p-2 flex gap-2 cursor-pointer items-center justify-center">
        <input type="checkbox" onChange={handleCheck} />
        <p className="text-center">Share my location</p>
      </label>
      {location && (
        <p>
          <span className="font-bold">Location : </span>
          {location}
        </p>
      )}
    </div>
  );
};

export default Location;
