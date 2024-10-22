import { useEffect, useState } from "react";
import axios from "axios";
// const cors = require("cors");
// const express = require("express");
// const app = express();
// //cors
// // const allowedOrigins = ["http://localhost:3000", "http://localhost:3333"];
// app.use(
//   cors({
//     // origin: function (origin, callback) {
//     //   if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//     //     callback(null, true); //null error, true origin allowed
//     //   } else {
//     //     callback(new Error("Not allowed - CORS"));
//     //   }
//     // },
//     allowedOrigins: ["http://localhost:3000", "http://localhost:3333"],
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// const Past = () => {
function Past() {
  const [pasts, setPast] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/trips")
      .then((response) => {
        setPast(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="container">
      <div className="Past">
        <h1 className="mt-5">My Past Trips</h1>
        {pasts.map((past) => (
          <p key={past.id}>{past.trip_name}</p>
        ))}
      </div>
    </div>
  );
}

export default Past;
