"use client"
import React, { useState } from 'react';
import axios from "axios"


const Location = () => {

    const [location, setLocation] = useState("");
    const geocoding_Api = process.env.NEXT_PUBLIC_GEOCODING_API;
    const geocoding_Link = process.env.NEXT_PUBLIC_GEOCODING_LINK

    const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const query = `${position.coords.latitude},${position.coords.longitude}`
                    const apiUrl = `${geocoding_Link}?key=${geocoding_Api}&q=${query}`

                    try {
                        axios.get(apiUrl).then((res) => setLocation(res.data.results[0].formatted)).catch((err) => {
                            console.log(err)
                        })
                    } catch (error) {
                        console.log(error)
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
        <div className="dark flex p-2 ">
            <label>
                <input type="checkbox" onChange={handleCheck} />
                Share my location
            </label>
            {location && (
                <p>
                    Your location: {location}
                </p>
            )}
        </div>
    )
}

export default Location