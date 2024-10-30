import { useEffect, useState } from "react";

export function GetSinglePastTripData() {
  const [singlePastTrip, setSinglePastTrip] = useState([]);
  //   console.log("API request: " + trip_id);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:3333/trips/1");
      const jsonResult = await result.json();
      setSinglePastTrip(jsonResult);
    };
    fetchData();
  }, []);

  return singlePastTrip;
}
