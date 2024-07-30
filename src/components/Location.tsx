"use client";
import React, { useState } from "react";
import axios from "axios";

interface LocationProps {
  takelocation: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Location: React.FC<LocationProps> = ({ takelocation }) => {
  const [location, setLocation] = useState("");
  const geocoding_Api = process.env.NEXT_PUBLIC_GEOCODING_API;
  const geocoding_Link = process.env.NEXT_PUBLIC_GEOCODING_LINK;
  // const olaGeocoding_Link = process.env.OLA_MAP_GEOCODING_API; // OLA MAP URL LINK

  const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const query = `${position.coords.latitude},${position.coords.longitude}`;
          const apiUrl = `${geocoding_Link}?key=${geocoding_Api}&q=${query}`;

          // THIS WAS EXPERIMENTAL OLA-API PART
          // const apiUrl = `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${query}&api_key=9LBd1N4nze75FOfS1Lraqa3qnrsReVXIUjqe09mN`;

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
