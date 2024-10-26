import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState({
    id: null,
    name: "",
    surname: "",
    email: "",
    profile_pic: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

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
      setUser((prevUser) => ({
        ...prevUser,
        ...response.data
      }));
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUser((prevUser) => ({ ...prevUser, profile_pic: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${user.id}`, {
        name: user.name,
        surname: user.surname,
        email: user.email,
        profile_pic: user.profile_pic,
        newPassword: user.newPassword,
        oldPassword: user.oldPassword
      });
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="container" style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh"
    }}>
      <div className="Profile">
        <h1 className="mt-5">Hello {user.name}</h1>

        <form onSubmit={handleSubmit} style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "300px",
          width: "100%"
        }}>
          {user.profile_pic && (
            <img 
              src={`http://localhost:3333/uploads/profile-pics/${user.profile_pic}`}
              alt="Profile"
              style={{ width: "100px", height: "100px", borderRadius: "50%", marginBottom: "20px" }} 
            />
          )}
          <input type="file" name="profile_pic" onChange={handleImageChange} style={{ marginBottom: "15px" }} />

          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Name"
            style={{ marginBottom: "10px", width: "100%" }}
          />
          <input
            type="text"
            name="surname"
            value={user.surname}
            onChange={handleChange}
            placeholder="Surname"
            style={{ marginBottom: "10px", width: "100%" }}
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            style={{ marginBottom: "10px", width: "100%" }}
          />
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={user.oldPassword}
            onChange={handleChange}
            style={{ marginBottom: "10px", width: "100%" }}
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={user.newPassword}
            onChange={handleChange}
            style={{ marginBottom: "10px", width: "100%" }}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChange={handleChange}
            style={{ marginBottom: "20px", width: "100%" }}
          />
          <button type="submit" style={{ width: "100%", marginBottom: "10px" }}>Save</button>
        </form>

        <Link to="/" className="link">
          <button style={{ width: "100%" }}>Back</button>
        </Link>
      </div>
    </div>
  );
}

export default Profile;