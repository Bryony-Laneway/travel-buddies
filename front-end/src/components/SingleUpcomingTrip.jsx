import { useEffect, useState } from "react";
import UpcomingTripsData from "../components/UpcomingTrips";

// handleclick method from article
// handleClick(props.id) {
//   this.setState({id: props.id});
// }

// console.log(upcomingTrips.id);
export function GetSingleTrip() {
  const upcomingTrips = UpcomingTripsData();
  console.log(upcomingTrips);
  //   var trip_id = id;

  const [singleUpTrip, setSingleUpTrip] = useState([]);
  //   console.log("API request: " + trip_id);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        "http://localhost:3333/trips/" + upcomingTrips.id
      );
      const jsonResult = await result.json();
      setSingleUpTrip(jsonResult);
    };
    fetchData();
  }, []);

  return singleUpTrip;
}
