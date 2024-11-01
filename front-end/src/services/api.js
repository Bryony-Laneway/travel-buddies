
// Get all trips
export async function getPastTrips() {
  try {
    const response = await fetch(`http://localhost:3333/trips`);
    if (!response.ok) throw new Error("Failed to fetch past trips");
    return await response.json();
  } catch (error) {
    console.error("Error fetching past trips:", error);
    throw error;
  }
}

// Get a single trip by ID
export async function getSinglePastTrip(id) {
  try {
    const response = await fetch(`http://localhost:3333/trips/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch trip with ID: ${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching single past trip:", error);
    throw error;
  }
}

// Get all favorite places for a specific trip
export async function getFavouritePlaces(tripId) {
  try {
    const response = await fetch(`http://localhost:3333/trips/places/${tripId}`);
    if (!response.ok) throw new Error("Failed to fetch favorite places");
    return await response.json();
  } catch (error) {
    console.error("Error fetching favorite places:", error);
    throw error;
  }
}

// Add a new favorite place
export async function addFavouritePlace(placeData) {
  try {
    const response = await fetch(`http://localhost:3333/trips/places/id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(placeData),
    });

    if (!response.ok) throw new Error("Failed to add favorite place");
    return await response.json();
  } catch (error) {
    console.error("Error adding favorite place:", error);
    throw error;
  }
}
