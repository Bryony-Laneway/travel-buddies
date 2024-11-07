import { useState } from "react";
import { addNewTrip } from "../services/api";

const CreateTrip = (props) => {
  //   const [startDate, setStartDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  //   const [items, setItems] = useState([]);
  //   const [inputText, setInputText] = useState("");
  const [tripData, setTripData] = useState({
    host_id: "1",
    co_host_id: "2",
    trip_name: "",
    start_date: "08/11/2024",
    end_date: "12/11/2024",
    itinerary: "",
    notes: "",
  });

  function handleChange(event) {
    // const data = event.target.value;
    // setTripData(data);
    const { name, value } = event.target;
    setTripData((prevData) => ({ ...prevData, [name]: value }));
  }
  //   function addItem(inputText) {
  //     setItems((prevItems) => {
  //       return [...prevItems, inputText];
  //     });
  //   }
  //   function addBuddy() {}
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      await addNewTrip(tripData);
      setSuccessMessage("Trip created!");
      //setFavPlaces([...favPlaces, { name }]); // Update fav places with new entry
    } catch (err) {
      setError("Failed to add place.");
    }
  };
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
            onChange={handleChange}
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
            name="itinerary"
            className="login-input"
            onChange={handleChange}
          ></textarea>
        </div>
        {/* <div className="row mb-3">
          <input
            type="text"
            placeholder="Key Place"
            name="trip_key_place"
            className="login-input"
          ></input>
        </div> */}
        <div className="row mb-3">
          <textarea
            type="text"
            placeholder="Trip Notes"
            name="notes"
            className="login-input w-50"
            onChange={handleChange}
          ></textarea>
          {/* <textarea
            type="text"
            placeholder="Packing List"
            name="trip_packing_list"
            className="login-input w-50"
          ></textarea> */}
        </div>
        <div className="row mb-3">
          <input
            type="text"
            placeholder="Buddies"
            name="trip_buddies"
            className="login-input"
          ></input>
          {/* <button onClick={addBuddy} className="btn btn-outline-warning">
            Add
          </button> */}
        </div>
        <div className="row mb-3">
          <button
            // onSubmit={(event) => {
            //   props.onAdd(inputText);
            //   event.preventDefault();
            // }}
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
