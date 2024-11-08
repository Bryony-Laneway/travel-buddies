import PastTrips from "./Past";
import UpcomingTrips from "./Upcoming";
import BuddiesCard from "../components/BuddiesCard";
import { useEffect, useState } from "react";
import { getFriends } from "../services/api";

const Home = () => {
  const [buddies, setBuddies] = useState([]);
  const loggedInUserId = JSON.parse(localStorage.getItem('user')).id;

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendsData = await getFriends(loggedInUserId);
        setBuddies(friendsData); // If there are friends, set the data
      } catch (error) {
        console.error('Error fetching friends:', error); // Log the error if there's a problem
      }
    };

    fetchFriends();
  }, [loggedInUserId]);

  return (
    <>
      <UpcomingTrips />
      <PastTrips />
      <BuddiesCard buddies={buddies} />
    </>
  );
};

export default Home;
