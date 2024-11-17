import { useEffect, useState } from "react";
import PastCard from "../components/PastCard";
import { getPastTripsByUser } from "../services/api";

function PastTrips() {
  const [pastTrips, setPastTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      const userId = JSON.parse(localStorage.getItem("user")).id;
      try {
        const data = await getPastTripsByUser(userId);
        setPastTrips(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="row mb-5">
        <div className="col">
          <h3 className="mt-5">Past Trips</h3>
        </div>
      </div>
      <div className="past-trips-container">
        <div className="row">
          {pastTrips.map((trip) => (
            <PastCard
              key={trip.id}
              tripId={trip.id}
              name={trip.trip_name}
              start_date={trip.start_date}
              end_date={trip.end_date}
              host={trip.host_name}
              img={trip.photo}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default PastTrips;
