import { useState, useEffect } from "react";
import { addTrip, getFriends } from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [friends, setFriends] = useState([]);
  const [tripData, setTripData] = useState({
    host_id: "", 
    co_host_id: "",
    trip_name: "",
    start_date: "",
    end_date: "",
    itinerary: "",
    notes: "",
  });

  // Initialize useNavigate
  const navigate = useNavigate();

  // Get the logged-in user's ID from localStorage
  const loggedInUserId = JSON.parse(localStorage.getItem('user'))?.id;

  useEffect(() => {
    if (loggedInUserId) {
      // Populate host_id with logged-in user's ID
      setTripData((prevData) => ({
        ...prevData,
        host_id: loggedInUserId,
      }));

      async function fetchFriends() {
        try {
          const friendsList = await getFriends(loggedInUserId);
          setFriends(friendsList);
        } catch (error) {
          setError("Failed to load friends.");
        }
      }

      fetchFriends();
    } else {
      setError("User not logged in.");
    }
  }, [loggedInUserId]);

  function handleChange(event) {
    const { name, value } = event.target;
    setTripData((prevData) => ({ ...prevData, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      await addTrip(tripData);
      setSuccessMessage("Trip created!");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      setError("Failed to add trip.");
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <h3 className="mb-5 text-center">Create New Trip</h3>
      {error && <p className="text-danger">{error}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "500px" }}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Trip Name"
            name="trip_name"
            value={tripData.trip_name}
            className="form-control form-control-lg"
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-3 row">
          {/* Host input */}
          <input
            type="text"
            placeholder="Host"
            name="host_id"
            value={tripData.host_id}
            className="form-control form-control-lg col"
            readOnly
          />
          
          {/* Co-host dropdown */}
          <select
            name="co_host_id"
            className="form-control form-control-lg col"
            onChange={handleChange}
            value={tripData.co_host_id}
          >
            <option value="">Select Co-Host</option>
            {friends.map((friend) => (
              <option key={friend.id} value={friend.id}>
                {friend.name}
              </option>
            ))}
          </select>
        </div>

        {/* Start date input */}
        <div className="mb-3">
          <input
            type="date"
            placeholder="Start Date"
            name="start_date"
            value={tripData.start_date}
            className="form-control form-control-lg"
            onChange={handleChange}
          />
        </div>

        {/* End date input */}
        <div className="mb-3">
          <input
            type="date"
            placeholder="End Date"
            name="end_date"
            value={tripData.end_date}
            className="form-control form-control-lg"
            onChange={handleChange}
          />
        </div>

        {/* Itinerary textarea */}
        <div className="mb-3">
          <textarea
            placeholder="Itinerary"
            name="itinerary"
            value={tripData.itinerary}
            className="form-control form-control-lg"
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Notes textarea */}
        <div className="mb-3">
          <textarea
            placeholder="Trip Notes"
            name="notes"
            value={tripData.notes}
            className="form-control form-control-lg"
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-outline-warning w-100">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTrip;
