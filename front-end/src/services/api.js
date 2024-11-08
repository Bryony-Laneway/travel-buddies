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

// Add new trip
export async function addNewTrip(tripData) {
  console.log("from api file: " + tripData);
  console.log(JSON.stringify(tripData));
  try {
    const response = await fetch(`http://localhost:3333/trips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripData),
    });

    if (!response.ok) throw new Error("Failed to create trip");
    return await response.json();
  } catch (error) {
    console.error("Error creating trip:", error);
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
    const response = await fetch(
      `http://localhost:3333/trips/places/${tripId}`
    );
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
    const response = await fetch(`http://localhost:3333/trips/places/`, {
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

// Get all users
export async function getUsers() {
  try {
    const response = await fetch(`http://localhost:3333/users`);
    if (!response.ok) throw new Error('Failed to fetch all users');
    return await response.json();
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
}

// Get all friends by userID
export async function getFriends(userId) {
  try {
    const response = await fetch(`http://localhost:3333/friends/${userId}`);
    if (!response.ok) throw new Error(`Failed to fetch friends for user with ID: ${userId}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching friends: ", error);
    throw error;
  }
}

// Add a friend by userID and friendID
export async function addFriend(userId, friendId) {
  const response = await fetch('http://localhost:3333/friends/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, friendId })
  });

  if (!response.ok) throw new Error('Error adding friend');
  return response.json();
}

// Delete a friend by userID and friendID
export async function deleteFriend(userId, friendId) {
  const response = await fetch('http://localhost:3333/friends/delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, friendId })
  });

  if (!response.ok) throw new Error('Error deleting friend');
  return response.json();
}