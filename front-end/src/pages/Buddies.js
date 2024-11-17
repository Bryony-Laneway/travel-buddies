import React, { useEffect, useState } from "react";
import { getFriends, getUsers, addFriend, deleteFriend } from "../services/api";
import BuddiesCard from "../components/BuddiesCard";

export function Buddies() {
  const [allUsers, setAllUsers] = useState([]);
  const [buddies, setBuddies] = useState([]);
  const loggedInUserId = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the user's friends
        const friends = await getFriends(loggedInUserId);
        setBuddies(friends);

        // Fetch all users
        const users = await getUsers();
        setAllUsers(users.filter((user) => user.id !== loggedInUserId)); // Exclude logged-in user
        // console.log('All Users:', users);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchData();
  }, [loggedInUserId]);

  // Handle adding a friend
  const handleAddFriend = async (userId) => {
    try {
      await addFriend(loggedInUserId, userId);
      const updatedFriends = await getFriends(loggedInUserId);
      setBuddies(updatedFriends);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  // Handle removing a friend
  const handleRemoveFriend = async (userId) => {
    try {
      await deleteFriend(loggedInUserId, userId);
      const updatedFriends = await getFriends(loggedInUserId);
      setBuddies(updatedFriends);
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  return (
    <div>
      <BuddiesCard buddies={buddies} />

      {/* All Users */}
      <div className="row mb-3">
        <h3 className="col-10 mt-3">Users</h3>
      </div>
      <div className="buddies-section row">
        {allUsers.length > 0 ? (
          allUsers.map((user) => (
            <div
              key={user.id}
              className="text-center col-xs-10 col-sm-6 col-md-6 col-lg-3 col-xl-2 mb-4"
            >
              <img
                src={`http://localhost:3333/uploads/profile-pics/${
                  user.profile_pic || "blank-avatar.jpg"
                }`}
                alt={`${user.name} ${user.surname}`}
                className="buddies-profile-pic mb-1"
              />
              <p className="user-name">
                {user.name} {user.surname}
              </p>
              {buddies.some((buddy) => buddy.id === user.id) ? (
                <button
                  className="btn btn-outline-success btn-sm mt-2"
                  onClick={() => handleRemoveFriend(user.id)}
                >
                  Remove Friend
                </button>
              ) : (
                <button
                  className="btn btn-outline-warning btn-sm mt-2"
                  onClick={() => handleAddFriend(user.id)}
                >
                  Add Friend
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No users available.</p>
        )}
      </div>
    </div>
  );
}

export default Buddies;
