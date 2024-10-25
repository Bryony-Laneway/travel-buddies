import Card from "../components/Card";
import UpcomingTripsData from "../components/UpcomingTrips";

function UpcomingTrips() {
  const upcomingTrips = UpcomingTripsData();
  console.log(upcomingTrips);

  function CreateCard(upcomingTrips) {
    return (
      <Card
        key={upcomingTrips.id}
        id={upcomingTrips.id}
        name={upcomingTrips.trip_name}
        date={upcomingTrips.host_id}
        host={upcomingTrips.start_date}
      />
    );
  }

  return (
    <div className="container">
      <div className="content col-10 mx-auto">
        <div className="row mb-5">
          <div className="col">
            <h3 className="">Upcoming Trips</h3>
          </div>
          <div className="col">
            <button className="btn btn-outline-warning add">Create Trip</button>
          </div>
        </div>
        <div className="upcoming-Trips-container">
          <div className="row">{upcomingTrips.map(CreateCard)}</div>
        </div>
      </div>
    </div>
  );
}

export default UpcomingTrips;
