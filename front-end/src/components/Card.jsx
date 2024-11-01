import { Link } from "react-router-dom";
// import { GetSingleTrip } from "./SingleUpcomingTrip";
// import { handleClick } from "./SingleUpcomingTrip";
import { useState, useEffect } from "react";
// import { API } from "./SingleUpcomingTrip";

// export function openTrip(tripId) {
//   // return JSON.parse(tripId);
// }

export function Card(props) {
  // const id = props.id;
  // const [singleUpcomingTrip, setSingleUpcomingTrip] = useState([]);
  // const [data, setData] = useState(null);

  // // console.log("Hello");
  // // console.log(props.id);
  // // var id = props[0].id;
  // // console.log("id is " + id);
  // useEffect(() => {
  //   let ignore = false;
  //   setData(null);
  //   API(id).then((result) => {
  //     if (!ignore) {
  //       setData(result);
  //     }
  //   });
  //   return () => {
  //     ignore = true;
  //     console.log(data);
  //   };
  // });

  // function API(data) {
  //   // const [id, setId] = useState(props.id);

  //   //   console.log("API request: " + trip_id);
  //   // var id = props.id;
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const result = await fetch("http://localhost:3333/trips/" + data);
  //       const jsonResult = await result.json();
  //       setSingleUpcomingTrip(jsonResult);
  //     };
  //     fetchData();
  //   });

  //   return singleUpcomingTrip;
  // }
  // return props.id;
  // handleclick method from article
  // const tripId = props.id;
  // const [tripID, setTripId] = useState();
  // function handleClick(tripId) {
  //   setTripId(tripId);
  // }
  // var key = props.id;
  // console.log(key);

  // const [id, setId] = useState();
  // function handleClick(event) {
  //   event.preventDefault();
  //   setId(event.target.value);
  //   console.log(id);
  //   API(id);
  //   return id;
  // }

  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-3">
      {/* <button onClick={GetSingleTrip(props.id)}> */}
      {/* youtube suggestion */}
      {/* <button onClick={tripId}> */}
      {/* <button onClick={openTrip(tripId)} key={props.id}> */}
      {/* article suggestion */}
      {/* <button key={props.id} onClick={() => this.handleClick(props.id)}> */}
      {/* <button key={tripID} onClick={handleClick(tripID)}> */}
      <button key={props.id} name={props.id} id={props.id}>
        {/* //put onclick in button?? or wrapping div?? */}
        {/* <Link to="/SingleUpcomingTrip"> */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {props.date}
            </h6>
            <p className="card-text">{props.name}</p>
          </div>
        </div>
        {/* </Link> */}
      </button>
    </div>
  );
}

export default Card;
