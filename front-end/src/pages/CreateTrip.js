import { useState } from "react";
// import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";

const CreateTrip = () => {
  const [startDate, setStartDate] = useState(new Date());
  function handleSubmit() {
    console.log(startDate);
  }
  return (
    <div>
      <h3 className="mb-5 w-100">Create New Trip</h3>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <input
            type="text"
            placeholder="Trip Name"
            name="trip_name"
            className="login-input w-80"
          ></input>
        </div>
        <div className="row mb-3">
          <input
            type="text"
            placeholder="Host"
            name="trip_host"
            className="login-input w-50"
          ></input>
          <input
            type="text"
            placeholder="Co-Host"
            name="trip_co_host"
            className="login-input w-50"
          ></input>
        </div>
        <div className="row mb-3">
          {/* start date, end date */}
          {/* <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        /> */}
        </div>
        <div className="row mb-3">
          <textarea
            type="text"
            placeholder="Itinerary"
            name="trip_itinerary"
            className="login-input"
          ></textarea>
        </div>
        <div className="row mb-3">
          <input
            type="text"
            placeholder="Key Place"
            name="trip_key_place"
            className="login-input"
          ></input>
        </div>
        <div className="row mb-3">
          <textarea
            type="text"
            placeholder="Trip Notes"
            name="trip_notes"
            className="login-input w-50"
          ></textarea>
          <textarea
            type="text"
            placeholder="Packing List"
            name="trip_packing_list"
            className="login-input w-50"
          ></textarea>
        </div>
        <div className="row mb-3">
          <input
            type="text"
            placeholder="Buddies"
            name="trip_buddies"
            className="login-input"
          ></input>
        </div>
        <div className="row mb-3">
          <button
            type="submit"
            className="btn btn-outline-warning w-50 mx-auto"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTrip;
