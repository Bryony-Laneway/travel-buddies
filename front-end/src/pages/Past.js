import PastCard from "../components/PastCard";
import PastTripsData from "../components/PastTrips";

function PastTrips() {
  const pastTrips = PastTripsData();
  console.log(pastTrips);

  function CreateCard(pastTrips) {
    // var tripdate = pastTrips.start_date;
    // var tripyear = tripdate.getMonth();
    return (
      <PastCard
        key={pastTrips.id}
        id={pastTrips.id}
        name={pastTrips.trip_name}
        date={pastTrips.start_date}
        host={pastTrips.host_name}
        img={pastTrips.photo}
      />
    );
  }

  return (
    <>
      <div className="row mb-5">
        <div className="col">
          <h3 className="">Past Trips</h3>
        </div>
      </div>
      <div className="past-Trips-container">
        <div className="row">{pastTrips.map(CreateCard)}</div>
      </div>
    </>
  );
}

export default PastTrips;
