// import { GetSingleTrip } from "./SingleUpcomingTrip";
import { GetSingleUpcomingTripData } from "../components/SingleUpcomingTrip";

// import { useState, useEffect } from "react";
// import { GetSinglePastTripData } from "../components/SinglePastTrip";
// import { GetFavouritePlaces } from "../components/FavouitePlaces";

const SingleUpcomingTrip = () => {
  const data = GetSingleUpcomingTripData();
  //   const favPlaces = GetFavouritePlaces();
  //   console.log(favPlaces);

  //   const [name, setName] = useState("");
  //   const [id] = useState("");
  //   const [trip_id] = useState("");
  //   const [user_id] = useState("");
  //   const [error, setError] = useState(null);
  //   const [successMessage, setSuccessMessage] = useState(null);

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setError(null);
  //     setSuccessMessage(null);

  //     const placeData = {
  //       id,
  //       trip_id,
  //       user_id,
  //       name,
  //     };

  //     try {
  //       const response = await fetch("http://localhost:3333/trips/places/id", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(placeData),
  //       });

  //       const data = await response.json();
  //       if (response.ok) {
  //         setSuccessMessage("Place added!");
  //       } else {
  //         setError(data.message || "Try again");
  //       }
  //     } catch (error) {
  //       setError("An error occurred.");
  //     }
  //   };

  return (
    <div className="container">
      <div className="content col-10 mx-auto single">
        <div>
          <h3 className="w-100">{data.trip_name}</h3>
          <h6>
            <strong>{data.start_date}</strong>
          </h6>
          <p className="italic">
            <strong>Hosted By:</strong> {data.host_name},{" "}
            <strong>Co-hosted by:</strong> {data.co_host_name}
          </p>
        </div>
        <div>
          <h5>Our Itinerary:</h5>
          <p>{data.itinerary}</p>
        </div>
        <div>
          <h5>The Buddies:</h5>
          <p>List of friends who went.</p>
        </div>
        <div>
          <h5>Trip Photos:</h5>
          <p>Everyone's photos and possibility to select favourite.</p>
          <form className="file-upload mb-3">
            <input className="input" type="file-upload"></input>
            <button className="btn btn-outline-warning" type="submit">
              Upload Photo
            </button>
          </form>
        </div>
        {/* <div>
          <h5>Our favourite places:</h5>
          <div className="fav-places-art">
            <p>{favPlaces.name}</p>
          </div>
          <p>List of the favourite places: {favPlaces.name}</p>
          <form onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              name="name"
              placeholder="My favourite Place"
              onChange={(e) => setName(e.target.value)}
            ></input>
            <button className="btn btn-outline-warning" type="submit">
              Add
            </button>
          </form>
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default SingleUpcomingTrip;
