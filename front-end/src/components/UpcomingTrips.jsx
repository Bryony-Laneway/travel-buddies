import { useEffect, useState } from "react";

function UpcomingTripsData() {
  const [upcomingTrips, setUpcomingTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:3333/trips");
      const jsonResult = await result.json();
      setUpcomingTrips(jsonResult);
    };
    fetchData();
  }, []);

  return upcomingTrips;
}

export default UpcomingTripsData;
