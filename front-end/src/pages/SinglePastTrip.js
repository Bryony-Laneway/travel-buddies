// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { getTrip, getTripFriends, getFriends, getKeyPlaces, getPackingList } from "../services/api";

// const SinglePastTrip = () => {
//   const { tripId } = useParams();
//   const [tripData, setTripData] = useState(null);
//   const [friends, setFriends] = useState([]); // List of all friends
//   const [tripFriends, setTripFriends] = useState([]); // Friends in the trip
//   const [keyPlaces, setKeyPlaces] = useState([]);
//   const [packingList, setPackingList] = useState([]);
//   const [feedback, setFeedback] = useState({ error: null, success: null });
//   const userId = JSON.parse(localStorage.getItem('user')).id;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const trip = await getTrip(tripId);
//         setTripData(trip);

//         // Fetch trip friends
//         const tripFriendsList = await getTripFriends(tripId);
//         setTripFriends(tripFriendsList.map(friend => friend.id));

//         // Fetch key places
//         const keyPlacesList = await getKeyPlaces(tripId);
//         setKeyPlaces(keyPlacesList);

//         // Fetch packing list items
//         const packingItems = await getPackingList(tripId);
//         setPackingList(packingItems);

//         const allFriends = await getFriends(userId);
//         setFriends(allFriends);

//       } catch {
//         setFeedback({ error: "Failed to load trip data." });
//       }
//     };
//     fetchData();
//   }, [tripId]);

//   if (!tripData) return <p>Loading...</p>;

//   return (
//     <div className="container col-10 mx-auto single">
//       <h3>{tripData.trip_name}</h3>
//       <p><strong>Start Date:</strong> {tripData.start_date}</p>
//       <p><strong>End Date:</strong> {tripData.end_date}</p>
//       <p><strong>Hosted by:</strong> {tripData.host_name}</p>

//       <h5>Itinerary</h5>
//       <p>{tripData.itinerary}</p>

//       <h5>Notes</h5>
//       <p>{tripData.notes}</p>

//       <h5>Friends</h5>
//       <ul>
//         {tripFriends.map((friendId) => {
//           const friend = friends.find(f => f.id === friendId);
//           return friend ? <li key={friend.id}>{friend.name}</li> : null;
//         })}
//       </ul>

//       <h5>Key Places</h5>
//       <ul>
//         {keyPlaces.map((place, i) => <li key={i}>{place.name}</li>)}
//       </ul>

//       <h5>Packing List</h5>
//       <ul>
//         {packingList.map((item) => <li key={item.id}>{item.item}</li>)}
//       </ul>

//       {feedback.error && <div className="alert alert-danger">{feedback.error}</div>}
//       {feedback.success && <div className="alert alert-success">{feedback.success}</div>}
//     </div>
//   );
// };

// export default SinglePastTrip;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getTrip,
  getTripFriends,
  getFriends,
  getKeyPlaces,
  getPackingList,
} from "../services/api";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const SinglePastTrip = () => {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState(null);
  const [friends, setFriends] = useState([]);
  const [tripFriends, setTripFriends] = useState([]);
  const [keyPlaces, setKeyPlaces] = useState([]);
  const [feedback, setFeedback] = useState({ error: null, success: null });
  const userId = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trip = await getTrip(tripId);
        setTripData(trip);

        const tripFriendsList = await getTripFriends(tripId);
        setTripFriends(tripFriendsList.map((friend) => friend.id));

        const keyPlacesList = await getKeyPlaces(tripId);
        setKeyPlaces(keyPlacesList);

        const allFriends = await getFriends(userId);
        setFriends(allFriends);
      } catch {
        setFeedback({ error: "Failed to load trip data." });
      }
    };
    fetchData();
  }, [tripId, userId]);

  if (!tripData) return <p>Loading...</p>;

  return (
    <div className="container col-10 mx-auto single shadow-lg">
      <h3 className="text-center w-100 mb-4 trip-heading">
        {tripData.trip_name}
      </h3>

      <p className="text-center">
        <strong>Hosted by:</strong> {tripData.host_name}
      </p>
      <div className="">
        <p>
          <strong>Start Date:</strong> {formatDate(tripData.start_date)}
        </p>
        <p>
          <strong>End Date:</strong> {formatDate(tripData.end_date)}
        </p>
      </div>

      <h5 className="trip-subheading">Our Itinerary</h5>
      <p>{tripData.itinerary}</p>

      <h5 className="trip-subheading">Key Notes</h5>
      <p>{tripData.notes}</p>

      <h5 className="trip-subheading">Trip Buddies</h5>
      <div>
        {tripFriends.map((friendId) => {
          const friend = friends.find((f) => f.id === friendId);
          return friend ? <div key={friend.id}>{friend.name}</div> : null;
        })}
      </div>

      <h5 className="trip-subheading">Favourite Places</h5>
      <div>
        {keyPlaces.map((place, i) => (
          <div key={i}>{place.name}</div>
        ))}
      </div>

      {feedback.error && (
        <div className="alert alert-danger">{feedback.error}</div>
      )}
      {feedback.success && (
        <div className="alert alert-success">{feedback.success}</div>
      )}
    </div>
  );
};

export default SinglePastTrip;
