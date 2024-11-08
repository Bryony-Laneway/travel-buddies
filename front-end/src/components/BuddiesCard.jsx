import React from 'react';

export function BuddiesCard({ buddies }) {
  return (
    <>
      <div className="row mb-3">
        <h3 className="col-10 mt-3">My Buddies</h3>
      </div>
      <div className="buddies-section mb-5 d-flex flex-wrap">
        {buddies.length > 0 ? (
          buddies.map(buddy => (
            <div key={buddy.id} className="text-center mx-2">
              <img
                src={`http://localhost:3333/uploads/profile-pics/${buddy.profile_pic || 'blank-avatar.jpg'}`}
                alt={`${buddy.name} ${buddy.surname}`}
                className="buddies-profile-pic mb-1"
              />
              <span className="d-block">{buddy.name}</span>
            </div>
          ))
        ) : (
          <p>No friends yet!</p>
        )}
      </div>
    </>
  );
};

export default BuddiesCard;