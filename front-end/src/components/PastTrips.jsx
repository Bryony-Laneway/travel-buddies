import { useEffect, useState } from "react";

function PastTripsData() {
  const [pastTrips, setPastTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:3333/trips");
      const jsonResult = await result.json();
      setPastTrips(jsonResult);
    };
    fetchData();
  }, []);

  return pastTrips;
}

export default PastTripsData;
