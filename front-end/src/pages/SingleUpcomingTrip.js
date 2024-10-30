import { GetSingleTrip } from "../components/SingleUpcomingTrip";
import Card from "../components/Card";
import { openTrip } from "../components/Card";

function SingleUpcomingTrip(openTrip) {
  // const singleUpcomingTrip = GetSingleTrip(id);
  // console.log(singleUpcomingTrip);
  // YouTube Method
  // function GetDataSingleUpcoming(id) {
  //   return id;
  // }
  return (
    <div className="single-upcoming-trip">
      {/* <Card data={GetDataSingleUpcoming} /> */}
      <Card id={openTrip} />
      <h1>Single Upcoming Trip</h1>
      <h2>This is my single upcoming trip</h2>
      <h3>The trip I clicked on is trip number {openTrip}</h3>
    </div>
  );
}

export default SingleUpcomingTrip;
