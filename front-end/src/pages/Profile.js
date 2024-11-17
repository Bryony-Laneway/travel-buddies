import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState({
    id: null,
    name: "",
    surname: "",
    email: "",
    profilePic: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [displayedName, setDisplayedName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { id } = JSON.parse(storedUser);
      fetchUserData(id);
    }
  }, []);

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3333/users/${id}`);
      // console.log(JSON.stringify(response.data, null, 2));

      // Transform profile_pic to profilePic
      const transformedData = {
        ...response.data,
        profilePic: response.data.profile_pic,
      };

      setUser((prevUser) => ({
        ...prevUser,
        ...transformedData,
      }));

      setDisplayedName(transformedData.name);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("E Target - Handle Change: " + e.target);
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile_pic", file);
      try {
        const response = await axios.post(
          `http://localhost:3333/users/${user.id}/profile-picture`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setUser((prevUser) => ({
          ...prevUser,
          profilePic: response.data.profilePic,
        }));
        console.log("Profile picture updated successfully");
      } catch (error) {
        console.error("Failed to upload profile picture:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.newPassword && user.newPassword !== user.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    try {
      await axios.put(`http://localhost:3333/users/${user.id}`, {
        name: user.name,
        surname: user.surname,
        email: user.email,
        newPassword: user.newPassword,
      });

      setDisplayedName(user.name);
      setSuccessMessage("Profile updated successfully!");

      // Navigate back to home page after a delay
      setTimeout(() => {
        navigate("/"); // Use navigate to go back to home
      }, 2000); // Delay of 2 seconds for the success message
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="Profile">
      <h3 className="mt-5 w-100">Hello {displayedName}</h3>

      {successMessage && <div className="alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row mt-3">
          {user.profilePic ? (
            <img
              src={`http://localhost:3333/uploads/profile-pics/${user.profilePic}`}
              alt="Profile"
              onClick={() => document.getElementById("fileInput").click()}
              className="profile-pic"
              title="Edit Profile Pic"
            />
          ) : (
            <img
              src={`http://localhost:3333/uploads/profile-pics/blank-avatar.jpg`}
              alt="Profile"
              onClick={() => document.getElementById("fileInput").click()}
              className="profile-pic"
              title="Edit Profile Pic"
            />
          )}
          <input
            type="file"
            id="fileInput"
            name="profile_pic"
            onChange={handleImageChange}
            className="mt-3 hidden"
          />
        </div>
        <div className="row mt-3">
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Name"
            className="input w-100"
          />
        </div>
        <div className="row mt-3">
          <input
            type="text"
            name="surname"
            value={user.surname}
            onChange={handleChange}
            placeholder="Surname"
            className="input w-100"
          />
        </div>
        <div className="row mt-3">
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            className="input w-100"
          />
        </div>
        <div className="row mt-3">
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={user.newPassword}
            onChange={handleChange}
            className="input w-100"
          />
        </div>
        <div className="row mt-3">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChange={handleChange}
            className="input w-100"
          />
        </div>
        <div className="row mt-3">
          <button
            type="submit"
            className="btn btn-outline-warning col-2 mx-auto"
          >
            Save
          </button>
        </div>
      </form>

      <Link to="/" className="link">
        <button className="btn btn-outline-success">Back</button>
      </Link>
    </div>
  );
}

export default Profile;
