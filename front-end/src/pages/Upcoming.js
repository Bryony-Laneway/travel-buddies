import React, { useEffect, useState } from "react";

// function Card(upcomingTrip) {
//   return (
//     <Card
//       key={upcomingTrip.id}
//       name={upcomingTrip.trip_name}
//       date={upcomingTrip.start_date}
//       host={upcomingTrip.host_id}
//     />
//   );
// }

function UpcomingTrips() {
  const [upcomingTrips, setUpcomingTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:3333/trips");
      const jsonResult = await result.json();
      setUpcomingTrips(jsonResult);
    };
    fetchData();
  }, []);

  //   const submitTrip = async () => {
  //     const myData = {
  //       //get user inputs for adding a trip
  //       //   title: ,
  //       //   host: ,
  //       //   co-host:,
  //       //   ...
  //     };

  //     const result = await fetch("http://localhost:3333/trips", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(myData),
  //     });
  //     const resultInJson = await result.json();
  //   };

  return (
    <div className="contents mt-5">
      <h1 className="mt-5">Upcoming Trips</h1>
      <button className="btn btn-outline-warning">Create Trip</button>
      <div className="upcoming-Trips-container">
        {upcomingTrips.map((upcomingTrip) => (
          <div key={upcomingTrip.id} className="upcoming-trip-item">
            <h4>{upcomingTrip.trip_name}</h4>
            {/* <div className="row">{Card(upcomingTrip)}</div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingTrips;
