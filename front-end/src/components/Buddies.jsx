import React, { useEffect, useState } from 'react';

const Buddies = () => {
  const [buddies, setBuddies] = useState([]);
  const loggedInUserId = JSON.parse(localStorage.getItem('user')).id;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3333/users');
        const data = await response.json();

        // Filter out the logged-in user
        const filteredFriends = data.filter(user => user.id !== loggedInUserId);
        setBuddies(filteredFriends);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [loggedInUserId]);

  return (
    <>
    <div className="row mb-3">
        <h3 className="col-10 mt-3">My Buddies</h3>
    </div>
    <div className="buddies-section mb-5 d-flex flex-wrap">
        {buddies.map(buddy => (
            <div key={buddy.id} className="text-center mx-2">
            <img
                src={`http://localhost:3333/uploads/profile-pics/${buddy.profile_pic}`}
                alt={`${buddy.name} ${buddy.surname}`}
                className="buddies-profile-pic mb-1"
            />
            <span className="d-block">{buddy.name}</span>
            </div>
        ))}
    </div>
    </>
  );
};

export default Buddies;