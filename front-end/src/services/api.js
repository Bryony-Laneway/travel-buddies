// FRIENDS
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


// USERS
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


// TRIPS
// Get all past trips
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

// Get a past trip by Id
export async function getSinglePastTrip(tripId) {
  try {
    const response = await fetch(`http://localhost:3333/trips/${tripId}`);
    if (!response.ok) throw new Error(`Failed to fetch trip with ID: ${tripId}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching single past trip:", error);
    throw error;
  }
}

// Get all upcoming trips
export async function getUpcomingTrips() {
  try {
    const response = await fetch(`http://localhost:3333/trips`);
    if (!response.ok) throw new Error("Failed to fetch past trips");
    return await response.json();
  } catch (error) {
    console.error("Error fetching past trips:", error);
    throw error;
  }
}

// Get an upcoming trip by Id
export async function getSingleUpcomingTrip(tripId) {
  try {
    const response = await fetch(`http://localhost:3333/trips/${tripId}`);
    if (!response.ok) throw new Error(`Failed to fetch trip with ID: ${tripId}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching single past trip:", error);
    throw error;
  }
}

// Add a trip
export async function addTrip(tripData) {
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

// Get all friends by tripID
export async function getTripFriends(tripId) {
  try {
    const response = await fetch(`http://localhost:3333/trips/friends/${tripId}`);
    if (!response.ok) throw new Error('Failed to fetch friends for the trip');
    return await response.json();
  } catch (error) {
    console.error("Error fetching trip friends:", error);
    throw error;
  }
}

// Add a friend to a trip by tripID and userID
export async function addFriendToTrip(tripId, userId) {
  try {
    const response = await fetch(`http://localhost:3333/trips/trip-friends`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tripId, userId })
    });
    if (!response.ok) throw new Error('Failed to add friend to trip');
    return await response.json();
  } catch (error) {
    console.error("Error adding friend to trip:", error);
    throw error;
  }
}

// Remove a friend from a trip (assuming delete method)
export async function removeFriendFromTrip(tripId, userId) {
  try {
    const response = await fetch(`http://localhost:3333/trips/trip-friends`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tripId, userId })
    });
    if (!response.ok) throw new Error('Failed to remove friend from trip');
    return await response.json();
  } catch (error) {
    console.error("Error removing friend from trip:", error);
    throw error;
  }
}

// Get all key places by tripID
export async function getKeyPlaces(tripId) {
  try {
    const response = await fetch(`http://localhost:3333/trips/key-places/${tripId}`);
    if (!response.ok) throw new Error('Failed to fetch key places for the trip');
    return await response.json();
  } catch (error) {
    console.error("Error fetching key places:", error);
    throw error;
  }
}

// Add a key place to a trip
export async function addKeyPlace(tripId, userId, name) {
  try {
    const response = await fetch(`http://localhost:3333/trips/key-places`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tripId, userId, name })
    });
    if (!response.ok) throw new Error('Failed to add key place to trip');
    return await response.json();
  } catch (error) {
    console.error("Error adding key place to trip:", error);
    throw error;
  }
}

// Get all packing items for a trip by tripID
export async function getPackingList(tripId) {
  try {
    const response = await fetch(`http://localhost:3333/trips/packing-list/${tripId}`);
    if (!response.ok) throw new Error('Failed to fetch packing list for the trip');
    return await response.json();
  } catch (error) {
    console.error("Error fetching packing list:", error);
    throw error;
  }
}

// Add a packing item to a trip (assuming endpoint exists for adding items)
export async function addPackingItem(tripId, item) {
  try {
    const response = await fetch(`http://localhost:3333/trips/packing-list`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tripId, item })
    });
    if (!response.ok) throw new Error('Failed to add packing item');
    return await response.json();
  } catch (error) {
    console.error("Error adding packing item:", error);
    throw error;
  }
}

