import React, { useState } from "react";
// import { Container, Card, Button } from "react-bootstrap";

const ChooseVibe = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [surpriseResult, setSurpriseResult] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    fetchDestination(option);
  };

  const fetchDestination = async (option) => {
    try {
      const response = await fetch("http://localhost:3333/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ option }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSurpriseResult(data.suggestion || "No suggestions received.");
    } catch (error) {
      console.error("Error fetching destination:", error);
      setSurpriseResult("Error fetching suggestion. Please try again later.");
    }
  };

  return (
    <>
      <h3 className="w-100 mb-5">Trip Ideas</h3>
      <div>
        <h5 className="mt-5">
          Can't decide on your next trip, let us help you!
        </h5>
        <p>Select your preference or let us surprise you with a destination.</p>
        <div className="my-5">
          <button
            className="btn btn-outline-warning"
            onClick={() => handleSelect("Mountains")}
          >
            Mountains
          </button>
          <button
            className="btn btn-outline-warning mx-3"
            onClick={() => handleSelect("Beach")}
          >
            Beach
          </button>
          <button
            className="btn btn-outline-warning"
            onClick={() => handleSelect("Surprise Me")}
          >
            Surprise Me
          </button>
        </div>
      </div>

      {selectedOption && (
        <div className="text-center mt-4 shadow-lg single">
          <h3 className="trip-heading mx-auto mb-5 w-100"> {selectedOption}</h3>
          {surpriseResult ? (
            <div>
              <h5 className="trip-subheading">Destination: </h5>
              <p>{surpriseResult.destination}</p>
              <h5 className="trip-subheading">Itinerary:</h5>
              <p>{surpriseResult.itinerary}</p>

              <h5 className="trip-subheading">Key Places to Visit:</h5>

              <ul>
                {surpriseResult.key_places.map((place, index) => (
                  <li key={index}>{place}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Fetching your destination...</p>
          )}
        </div>
      )}
    </>
  );
};

export default ChooseVibe;
