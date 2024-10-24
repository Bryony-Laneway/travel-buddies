import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import UpcomingTripsData from "../components/UpcomingTrips"

function UpcomingTrips() {
  const upcomingTrips = UpcomingTripsData();
  console.log(upcomingTrips);

  function CreateCard(upcomingTrips) {
    return (
      <Card
        key={upcomingTrips.id}
        name={upcomingTrips.trip_name}
        date={upcomingTrips.host_id}
        host={upcomingTrips.start_date}
      />
    );
  }
  
  return (
    <div className="contents mt-5">
      <h1 className="mt-5">Upcoming Trips</h1>
      <button className="btn btn-outline-warning">Create Trip</button>
      <div className="upcoming-Trips-container">
      <div className="row">{upcomingTrips.map(CreateCard)}</div>
      </div>
    </div>
  );
}

export default UpcomingTrips;
