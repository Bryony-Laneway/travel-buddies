import PastCard from "../components/PastCard";
import PastTripsData from "../components/PastTrips";

function PastTrips() {
  const pastTrips = PastTripsData();
  console.log(pastTrips);

  function CreateCard(pastTrips) {
    return (
      <PastCard
        key={pastTrips.id}
        id={pastTrips.id}
        name={pastTrips.trip_name}
        date={pastTrips.start_date}
        host={pastTrips.host_id}
        img={pastTrips.photo}
      />
    );
  }

  return (
    <div className="container">
      <div className="content col-10 mx-auto">
        <div className="row mb-5">
          <div className="col">
            <h3 className="">Past Trips</h3>
          </div>
        </div>
        <div className="past-Trips-container">
          <div className="row">{pastTrips.map(CreateCard)}</div>
        </div>
      </div>
    </div>
  );
}

export default PastTrips;
