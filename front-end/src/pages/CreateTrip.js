import { useState, useEffect } from "react";
import { addTrip } from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [tripData, setTripData] = useState({
    host_id: "",
    trip_name: "",
    start_date: "",
    end_date: "",
    itinerary: "",
    notes: "",
  });
  const [hostEmail, setHostEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Get the logged-in user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log("Logged-in user:", user);

    if (user) {
      setTripData((prevData) => ({
        ...prevData,
        host_id: user.id,
      }));
      setHostEmail(user.email);
    } else {
      setError("User not logged in.");
    }
  }, []);

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
    <div className="col-9 mx-auto">
      <div className="row">
        <h3 className="mb-5 text-center">Create New Trip</h3>
      </div>
      {error && <p className="text-danger">{error}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="mx-auto">
        <div className="mb-3 row">
          <input
            type="text"
            placeholder="Trip Name"
            name="trip_name"
            value={tripData.trip_name}
            className="form-control form-control-lg login-input"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 row">
          <input
            type="text"
            placeholder="Host"
            value={hostEmail}
            className="form-control form-control-lg col login-input"
            readOnly
            disabled
          />
        </div>

        <div className="mb-3 row">
          <input
            type="date"
            placeholder="Start Date"
            name="start_date"
            value={tripData.start_date}
            className="form-control form-control-lg me-2 login-input col"
            onChange={handleChange}
          />
          <input
            type="date"
            placeholder="End Date"
            name="end_date"
            value={tripData.end_date}
            className="form-control form-control-lg login-input col"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 row">
          <textarea
            placeholder="Itinerary"
            name="itinerary"
            value={tripData.itinerary}
            className="form-control form-control-lg login-input"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3 row">
          <textarea
            placeholder="Trip Notes"
            name="notes"
            value={tripData.notes}
            className="form-control form-control-lg login-input"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="row  align-text-center">
          <button
            type="submit"
            className="col-md-2 btn btn-outline-warning mx-auto"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTrip;
