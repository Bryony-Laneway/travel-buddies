import UpcomingTrips from "../components/UpcomingTrips";
import Card from "../components/Card";
import PastCard from "../components/PastCard";
import PastTrips from "../components/PastTrips";
import Buddies from "../components/Buddies";

function CreateCard(upcoming) {
  return (
    <Card
      key={upcoming.name}
      name={upcoming.name}
      date={upcoming.date}
      host={upcoming.host}
    />
  );
}
function CreatePastCard(past) {
  return (
    <PastCard
      key={past.name}
      img={past.img}
      name={past.name}
      date={past.date}
    />
  );
}

const Home = () => {
  const upcoming = UpcomingTrips();
  const past = PastTrips();
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
        <div className="row">{upcoming.map(CreateCard)}</div>
        <div className="row mb-5">
          <h3 className="col-10 mt-5">Past Trips</h3>
        </div>
        <div className="row">{past.map(CreatePastCard)}</div>
        

        <Buddies />

      </div>
    </div>
  );
};

export default Home;
