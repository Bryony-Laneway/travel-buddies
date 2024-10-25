import { GetSingleTrip } from "../components/SingleUpcomingTrip";

function SingleUpcomingTrip(id) {
  const singleUpcomingTrip = GetSingleTrip(id);
  console.log(singleUpcomingTrip);
}

export default SingleUpcomingTrip;
