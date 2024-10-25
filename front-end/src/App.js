import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import PastTrips from "./pages/Past";
import UpdateProfile from "./pages/Profile";
import UpcomingTrips from "./pages/Upcoming";
import SingleUpcomingTrip from "./pages/SingleUpcomingTrip";
import { useState, useEffect } from "react";

export default function App() {
  const [user, setUser] = useState(null);

  // Check if user is logged in when the app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Load user info from localStorage
      // console.log("User loaded from localStorage:", savedUser); // Debugging
    }
  }, []);

  const handleLogin = (userInfo) => {
    setUser(userInfo);
    localStorage.setItem("user", JSON.stringify(userInfo)); // Store user info
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user info
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignUp />}
          />

          {/* Protected Routes */}
          {/* <Route path="/" element={user ? <Layout onLogout={handleLogout} /> : <Navigate to="/login" />}> */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/past" element={<PastTrips />} />
            <Route path="/upcoming" element={<UpcomingTrips />} />
            <Route
              path="/SingleUpcomingTrip"
              element={<SingleUpcomingTrip />}
            />
            <Route path="/profile" element={<UpdateProfile />} />
          </Route>

          {/* Catch-all for undefined routes */}
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
