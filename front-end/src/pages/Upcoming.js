import { useEffect, useState } from "react";
import UpcomingCard from "../components/UpcomingCard";
import { getUpcomingTripsByUser } from "../services/api"; // Import the API function
import { Link } from "react-router-dom";

function UpcomingTrips() {
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      const userId = JSON.parse(localStorage.getItem('user')).id;
      try {
        const data = await getUpcomingTripsByUser(userId);
        setUpcomingTrips(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  if (loading) return <p>Loading...</p>; // Show loading state
  if (error) return <p>Error: {error}</p>; // Show error state

  return (
    <>
      <div className="row mb-5">
        <div className="col">
          <h3 className="">Upcoming Trips</h3>
        </div>
        <div className="col">
          <Link to="/CreateTrip">
            <button className="btn btn-outline-warning add">Create Trip</button>
          </Link>
        </div>
      </div>
      <div className="upcoming-trips-container">
        <div className="row">
          {upcomingTrips.map((trip) => (
            <UpcomingCard
              key={trip.id}
              tripId={trip.id}
              name={trip.trip_name}
              host={trip.host_name}
              start_date={trip.start_date}
              end_date={trip.end_date}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default UpcomingTrips;
