// import UpcomingTrips from "../components/UpcomingTrips";
import Card from "../components/Card";
// import PastCard from "../components/PastCard";
// import PastTrips from "../components/PastTrips";
import Buddies from "../components/Buddies";
import PastCard from "../components/PastCard";
import PastTripsData from "../components/PastTrips";
import PastTrips from "./Past";
import UpcomingTripsData from "../components/UpcomingTrips";
import UpcomingTrips from "./Upcoming";

// const upcomingTrips = UpcomingTripsData();

function CreateCard(upcomingTrips) {
  return (
    <Card
      key={upcomingTrips.id}
      id={upcomingTrips.id}
      name={upcomingTrips.trip_name}
      host={upcomingTrips.host_name}
      date={upcomingTrips.start_date}
    />
  );
}

// function CreateCard(upcoming) {
//   return (
//     <Card
//       key={upcoming.name}
//       name={upcoming.name}
//       date={upcoming.date}
//       host={upcoming.host}
//     />
//   );
// }
// function CreatePastCard(past) {
//   return (
//     <PastCard
//       key={past.name}
//       img={past.img}
//       name={past.name}
//       date={past.date}
//     />
//   );
// }
function CreateCardPast(pastTrip) {
  // var tripdate = pastTrips.start_date;
  // var tripyear = tripdate.getMonth();
  const pastTrips = PastTripsData();
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

const Home = () => {
  const upcoming = UpcomingTripsData();
  const past = PastTripsData();
  return (
    // <div className="container">
    //   <div className="content col-10 mx-auto">
    <>
      <UpcomingTrips />
      {/* <div className="row mb-5">
        <div className="col">
          <h3 className="">Upcoming Trips</h3>
        </div>
        <div className="col">
          <button className="btn btn-outline-warning add">Create Trip</button>
        </div>
      </div>
      <div className="row">{upcoming.map(CreateCard)}</div> */}
      {/* <div className="row mb-5">
        <h3 className="col-10 mt-5">Past Trips</h3>
      </div> */}
      {/* <div className="row">{past.map(CreateCardPast)}</div> */}
      <PastTrips />
      <Buddies />
    </>
    //   </div>
    // </div>
  );
};

export default Home;
