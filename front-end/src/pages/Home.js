import PastTrips from "./Past";
import UpcomingTrips from "./Upcoming";
import Buddies from "../components/Buddies";

const Home = () => {
  return (
    <>
      <UpcomingTrips />
      <PastTrips />
      <Buddies />
    </>
  );
};

export default Home;
