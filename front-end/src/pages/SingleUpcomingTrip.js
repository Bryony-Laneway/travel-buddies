import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  getTrip, getTripFriends, addFriendToTrip, removeFriendFromTrip, 
  getFriends, getKeyPlaces, addKeyPlace, getPackingList, addPackingItem 
} from "../services/api";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' });
};

const SingleUpcomingTrip = () => {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState(null);
  const [friends, setFriends] = useState([]);
  const [tripFriends, setTripFriends] = useState([]);
  const [keyPlaces, setKeyPlaces] = useState([]);
  const [packingList, setPackingList] = useState([]);
  const [newKeyPlace, setNewKeyPlace] = useState("");
  const [newPackingItem, setNewPackingItem] = useState("");
  const [feedback, setFeedback] = useState({ error: null, success: null });
  const userId = JSON.parse(localStorage.getItem('user')).id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trip = await getTrip(tripId);
        setTripData(trip);

        const tripFriendsList = await getTripFriends(tripId);
        setTripFriends(tripFriendsList.map(friend => friend.id));

        const keyPlacesList = await getKeyPlaces(tripId);
        setKeyPlaces(keyPlacesList);

        const packingItems = await getPackingList(tripId);
        setPackingList(packingItems);

        const allFriends = await getFriends(userId);
        setFriends(allFriends);
        
      } catch {
        setFeedback({ error: "Failed to load trip data." });
      }
    };
    fetchData();
  }, [tripId]);

  const toggleFriendInTrip = async (friend) => {
    try {
      if (tripFriends.includes(friend.id)) {
        await removeFriendFromTrip(tripId, friend.id);
        setTripFriends(tripFriends.filter((id) => id !== friend.id));
        setFeedback({ success: "Friend removed from trip", error: null });
      } else {
        await addFriendToTrip(tripId, friend.id);
        setTripFriends([...tripFriends, friend.id]);
        setFeedback({ success: "Friend added to trip", error: null });
      }
    } catch {
      setFeedback({ error: `Failed to ${tripFriends.includes(friend.id) ? 'remove' : 'add'} friend to trip`, success: null });
    }
  };

  const handleAddKeyPlace = async () => {
    if (!newKeyPlace) return;
    try {
      await addKeyPlace(tripId, userId, newKeyPlace);
      const keyPlacesList = await getKeyPlaces(tripId);
      setKeyPlaces(keyPlacesList);
      
      setNewKeyPlace("");
      setFeedback({ success: "Key place added to trip", error: null });
    } catch {
      setFeedback({ error: "Failed to add key place", success: null });
    }
  };

  const handleAddPackingItem = async () => {
    if (!newPackingItem) return;
    try {
      await addPackingItem(tripId, newPackingItem);
      const packingItems = await getPackingList(tripId);
      setPackingList(packingItems);
      
      setNewPackingItem("");
      setFeedback({ success: "Packing item added", error: null });
    } catch {
      setFeedback({ error: "Failed to add packing item", success: null });
    }
  };

  if (!tripData) return <p>Loading...</p>;

  return (
    <div className="container col-10 mx-auto single">
      <h3 className="text-center w-100 mb-4">{tripData.trip_name}</h3>

      <p className="text-center"><strong>Hosted by:</strong> {tripData.host_name}</p>
      <div className="d-flex justify-content-between">
        <p><strong>Start Date:</strong> {formatDate(tripData.start_date)}</p>
        <p><strong>End Date:</strong> {formatDate(tripData.end_date)}</p>
      </div>

      <h5>Itinerary</h5>
      <p>{tripData.itinerary}</p>

      <h5>Notes</h5>
      <p>{tripData.notes}</p>

      <h5>Friends</h5>
      <div>
        {friends.map((friend) => (
          <div key={friend.id} className="mb-2">
            {friend.name} 
            <button 
              onClick={() => toggleFriendInTrip(friend)} 
              className={`btn btn-sm ${tripFriends.includes(friend.id) ? 'btn-outline-danger' : 'btn-outline-primary'}`}
            >
              {tripFriends.includes(friend.id) ? "Remove from Trip" : "Add to Trip"}
            </button>
          </div>
        ))}
      </div>

      <h5>Key Places</h5>
      <div>
        {keyPlaces.map((place, i) => <div key={i}>{place.name}</div>)}
      </div>
      <input
        type="text"
        value={newKeyPlace}
        onChange={(e) => setNewKeyPlace(e.target.value)}
        placeholder="Add a new key place"
      />
      <button onClick={handleAddKeyPlace} className="btn btn-outline-warning">Add Key Place</button>

      <h5>Packing List</h5>
      <div>
        {packingList.map((item) => <div key={item.id}>{item.item}</div>)}
      </div>
      <input
        type="text"
        value={newPackingItem}
        onChange={(e) => setNewPackingItem(e.target.value)}
        placeholder="Add a new packing item"
      />
      <button onClick={handleAddPackingItem} className="btn btn-outline-warning">Add Packing Item</button>

      {feedback.error && <div className="alert alert-danger">{feedback.error}</div>}
      {feedback.success && <div className="alert alert-success">{feedback.success}</div>}
    </div>
  );
};

export default SingleUpcomingTrip;
