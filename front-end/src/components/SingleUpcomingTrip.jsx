import { useEffect, useState } from "react";
import Card from "./Card";

export function GetSingleUpcomingTripData(id) {
  const [singleUpcomingTrip, setSingleUpcomingTrip] = useState([]);
  //   console.log("API request: " + trip_id);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:3333/trips/" + { id });
      const jsonResult = await result.json();
      setSingleUpcomingTrip(jsonResult);
    };
    fetchData();
  }, []);

  return singleUpcomingTrip;
}
