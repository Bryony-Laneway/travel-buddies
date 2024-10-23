import { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const checkPassword = () => {
    setError(null);
    let errorMessages = [];

    if (password.length < 6) errorMessages.push("Password is too short.");
    //if (!/[A-Z]/.test(password)) errorMessages.push("Must include a capital letter.");
    //if (!/\d/.test(password)) errorMessages.push("Must include a number.");
    if (password !== password2) errorMessages.push("Passwords must match.");

    if (errorMessages.length) {
      setError(errorMessages.join(" "));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!checkPassword()) return;

    const userData = {
      name,
      surname,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:3333/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Registration successful! Your user ID is " + data.userId);
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (error) {
      setError("An error occurred during registration.");
    }
  };

  return (
    <div className="container">
      <div className="text-center">
        <img src="./images/logo.png" alt="logo" className="mt-5 mb-5" />

        <h2>Sign Up</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px" }}>
          <div className="mb-3">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="First Name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="surname">Surname</label>
            <input
              type="text"
              name="surname"
              id="surname"
              className="form-control"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
              placeholder="Surname"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email Address"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password">Create Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create Password"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password2">Re-enter Password</label>
            <input
              id="password2"
              type="password"
              name="password2"
              className="form-control"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              placeholder="Re-enter Password"
            />
          </div>

          <button type="submit" className="btn btn-warning w-100">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
