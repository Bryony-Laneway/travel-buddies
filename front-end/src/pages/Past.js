import { useEffect, useState } from "react";
import axios from "axios";

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