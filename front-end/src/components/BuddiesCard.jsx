import React from "react";

export function BuddiesCard({ buddies }) {
  return (
    <>
      <div className="row mb-3">
        <h3 className="col-10 my-5">My Buddies</h3>
      </div>
      <div className="buddies-section mb-5 row">
        {buddies.length > 0 ? (
          buddies.map((buddy) => (
            <div
              key={buddy.id}
              className="text-center col-xs-10 col-sm-6 col-md-6 col-lg-3 col-xl-2 mb-4"
            >
              <img
                src={`http://localhost:3333/uploads/profile-pics/${
                  buddy.profile_pic || "blank-avatar.jpg"
                }`}
                alt={`${buddy.name} ${buddy.surname}`}
                className="buddies-profile-pic mb-1"
              />
              <p className="user-name">{buddy.name}</p>
            </div>
          ))
        ) : (
          <p>No friends yet!</p>
        )}
      </div>
    </>
  );
}

export default BuddiesCard;
