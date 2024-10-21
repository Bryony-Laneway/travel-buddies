import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UpdateProfile() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/")
      .then((response) => {
        setUsers(response.data);
        console.log("users data " + users);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="container">
      <div className="Profile">
        <h1 className="mt-5">Hello</h1>

        {users.map((user) => (
          <form>
            <img key={user.id} src={user.profile_pic} alt="profile"></img>
            <input type="text" key={user.id} name="name">
              {user.name}
            </input>
            <input
              type="text"
              key={user.id}
              name="surname"
              value={user.surname}
            ></input>
            <input
              type="email"
              key={user.id}
              name="email"
              value={user.email}
            ></input>
            <input
              type="password"
              key={user.id}
              name="oldPassword"
              placeholder="Old Password"
            ></input>
            <input
              type="password"
              key={user.id}
              name="newPassword"
              placeholder="New Password"
            ></input>
            <input
              type="password"
              key={user.id}
              name="confirmPassword"
              placeholder="Confirm Password"
            ></input>
            <button type="submit">Save</button>
          </form>
        ))}
        <Link to="/" className="link">
          <button>Back</button>
        </Link>
      </div>
    </div>
  );
}

export default UpdateProfile;
