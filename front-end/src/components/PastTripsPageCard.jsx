// import React, { useEffect, useState } from "react";

// export function PastCardPage() {
//   const [upcomingTrips, setUpcomingTrips] = useState();

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await fetch("http://localhost:3333/trips");
//       const jsonResult = await result.json();
//       setUpcomingTrips(jsonResult);
//     };
//     fetchData();
//   }, []);

//   //   const submitTrip = async () => {
//   //     const myData = {
//   //       //get user inputs for adding a trip
//   //       //   title: ,
//   //       //   host: ,
//   //       //   co-host:,
//   //       //   ...
//   //     };

//   //     const result = await fetch("http://localhost:3333/trips", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(myData),
//   //     });
//   //     const resultInJson = await result.json();
//   //   };

//   return (
//     <div className="upcoming-Trips-container">
//       {upcomingTrips.map((upcomingTrip) => (
//         <div
//           className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-3 upcoming-trip-item"
//           key={upcomingTrip.id}
//         >
//           <div className="card">
//             {/* <img src={upcomingTrip.img} className="card-img-top" alt="Past trip" /> */}
//             <div className="card-body">
//               <h5 className="card-title">{upcomingTrip.trip_name}</h5>
//               <h6 className="card-subtitle mb-2 text-body-secondary">
//                 {upcomingTrip.start_date}
//               </h6>
//               <p>{upcomingTrip.host_id}</p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default PastCardPage;
