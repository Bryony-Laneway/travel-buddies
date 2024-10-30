import { Link } from "react-router-dom";
import { GetSingleTrip } from "./SingleUpcomingTrip";
// import { handleClick } from "./SingleUpcomingTrip";
import { useState } from "react";

export function openTrip(tripId) {
  // return JSON.parse(tripId);
}

export function Card(props) {
  // return props.id;
  // handleclick method from article
  const tripId = props.id;
  // const [tripID, setTripId] = useState();
  // function handleClick(tripId) {
  //   setTripId(tripId);
  // }
  // var key = props.id;
  // console.log(key);

  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 mb-3">
      {/* <button onClick={GetSingleTrip(props.id)}> */}
      {/* youtube suggestion */}
      {/* <button onClick={tripId}> */}
      {/* <button onClick={openTrip(tripId)} key={props.id}> */}
      {/* article suggestion */}
      {/* <button key={props.id} onClick={() => this.handleClick(props.id)}> */}
      {/* <button key={tripID} onClick={handleClick(tripID)}> */}
      <Link to="/SingleUpcomingTrip">
        <div className="card" key={props.id} id={props.id}>
          <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {props.date}
            </h6>
            <p className="card-text">{props.name}</p>
          </div>
        </div>
      </Link>
      {/* </button> */}
    </div>
  );
}

export default Card;
