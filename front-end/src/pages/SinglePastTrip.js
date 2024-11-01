import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSinglePastTrip, getFavouritePlaces, addFavouritePlace } from "../services/api";

const SinglePastTrip = () => {
  const { tripId } = useParams();
  console.log("Trip ID:", tripId); // Debugging

  const [tripData, setTripData] = useState(null);
  const [favPlaces, setFavPlaces] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trip = await getSinglePastTrip(tripId);
        //const places = await getFavouritePlaces(); // Pass ID if needed
        setTripData(trip);
        //setFavPlaces(places);
      } catch (err) {
        setError("Failed to load trip data.");
      }
    };

    fetchData();
  }, [tripId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      await addFavouritePlace({ name });
      setSuccessMessage("Place added!");
      setFavPlaces([...favPlaces, { name }]); // Update fav places with new entry
    } catch (err) {
      setError("Failed to add place.");
    }
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    // Implement file upload logic here if needed
  };

  if (!tripData) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="content col-10 mx-auto single">
        <div>
          <h3 className="w-100">{tripData.trip_name}</h3>
          <h6><strong>{tripData.start_date}</strong></h6>
          <p className="italic">
            <strong>Hosted By:</strong> {tripData.host_name},{" "}
            <strong>Co-hosted by:</strong> {tripData.co_host_name}
          </p>
        </div>
        <div>
          <h5>Our Itinerary:</h5>
          <p>{tripData.itinerary}</p>
        </div>
        <div>
          <h5>The Buddies:</h5>
          <p>List of friends who went.</p>
        </div>
        <div>
          <h5>Trip Photos:</h5>
          <form className="file-upload mb-3" onSubmit={handleFileUpload}>
            <input type="file" onChange={handleFileChange} />
            <button className="btn btn-outline-warning" type="submit">
              Upload Photo
            </button>
          </form>
        </div>
        <div>
          <h5>Our favourite places:</h5>
          <div className="fav-places-list">
            {favPlaces.map((place, index) => (
              <p key={index}>{place.name}</p>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              name="name"
              placeholder="My favourite Place"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <button className="btn btn-outline-warning" type="submit">
              Add
            </button>
          </form>
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default SinglePastTrip;