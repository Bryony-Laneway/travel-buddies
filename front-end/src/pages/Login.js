import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [resetEmail, setResetEmail] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [resetPassword2, setResetPassword2] = useState("");
  const [resetError, setResetError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3333/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        onLogin(data.user);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred during login.");
    }
  };

  const handlePasswordReset = async () => {
    setResetError(null);
    setSuccessMessage(null);
    let errorMessages = [];

    if (resetPassword.length < 6) errorMessages.push("Password is too short.");
    //if (!/[A-Z]/.test(resetPassword)) errorMessages.push("Must include a capital letter.");
    //if (!/\d/.test(resetPassword)) errorMessages.push("Must include a number.");
    if (resetPassword !== resetPassword2) errorMessages.push("Passwords must match.");

    if (errorMessages.length) {
      setResetError(errorMessages.join(" "));
      return;
    }

    try {
      const response = await fetch("http://localhost:3333/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: resetEmail, newPassword: resetPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Password reset successfully. Please log in with your new password.");
      } else {
        setResetError(data.message || "Password reset failed.");
      }
    } catch (error) {
      setResetError("An error occurred during the password reset.");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <img src="./images/logo.png" alt="logo" className="mb-5" />
      <h2>Login</h2>

      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="btn btn-outline-success w-100">Login</button>
      </form>

      <div className="mt-3">
        <a
          href="#ForgotPasswordModal"
          data-bs-toggle="modal"
          className="text-info"
        >
          Forgot Password?
        </a>
      </div>

      <Link to="/signup">
        <button className="btn btn-outline-warning mt-4">Sign Up</button>
      </Link>

      {/* Reset Password Modal */}
      <div
        className="modal fade"
        id="ForgotPasswordModal"
        tabIndex="-1"
        aria-labelledby="ForgotPasswordModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ForgotPasswordModalLabel">Reset Password</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {resetError && <div className="alert alert-danger">{resetError}</div>}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}

              <form>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-3">
                  <label>New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={resetPassword}
                    onChange={(e) => setResetPassword(e.target.value)}
                    required
                    placeholder="Create new password"
                  />
                </div>
                <div className="mb-3">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={resetPassword2}
                    onChange={(e) => setResetPassword2(e.target.value)}
                    required
                    placeholder="Confirm new password"
                  />
                </div>
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  className="btn btn-outline-success w-100"
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
