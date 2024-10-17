import UpcomingTrips from "../components/UpcomingTrips";
import Card from "../components/Card";

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

const Home = () => {
  const upcoming = UpcomingTrips();
  return (
    <div className="container">
      <div className="content col-10 mx-auto">
        <div className="row mb-5">
          <h3 className="col-10">Upcoming Trips</h3>
          <button className="btn btn-outline-success add col-2">
            Create Trip
          </button>
        </div>
        <div className="row">{upcoming.map(CreateCard)}</div>
      </div>
    </div>
  );
};

export default Home;
