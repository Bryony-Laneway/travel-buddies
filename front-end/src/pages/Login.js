import { Link } from "react-router-dom";

function checkPassword() {
  var resetpassword = document.getElementById("resetpassword").value;
  var resetpassword2 = document.getElementById("resetpassword2").value;
  var reseterrorMessage = document.getElementById("reseterror");
  var reseterrorToThrow = "";

  try {
    if (resetpassword.length < 6) {
      reseterrorToThrow += "<br /> Password is too short";
    }
    if (/[A-Z]/g.test(resetpassword) == false) {
      reseterrorToThrow +=
        "<br /> Password should include at least one capital letter";
    }
    if (/\d/g.test(resetpassword) == false) {
      reseterrorToThrow += "<br /> Password should include at least one number";
    }
    if (resetpassword != resetpassword2) {
      reseterrorToThrow += "<br /> Passwords must match";
    }
    throw reseterrorToThrow;
  } catch (err) {
    document.getElementById("reseterror").style.visibility = "visible";
    reseterrorMessage.innerHTML = err;
  }
}

const Login = () => {
  return (
    <>
      <div className="login">
        <img src="./images/logo.png" alt="logo" className="mt-5 mb-5" />

        <form action="" method="post" className="login-form">
          <div className="col-xs-10 col-md-4 mx-auto">
            <input
              type="text"
              name="username"
              id="username"
              className="login-input mb-4 mt-2 form-control"
              placeholder="Username"
              required
            ></input>
          </div>

          <div className="col-xs-10 col-md-4 mx-auto">
            <input
              id="password"
              type="text"
              name="password"
              className="login-input mb-4 form-control"
              placeholder="Password"
              required
            ></input>
          </div>

          <button type="submit" className="btn btn-outline-warning">
            Login
          </button>
        </form>
        <div className="forgotton-div mt-4">
          <a
            className="forgotton-link"
            data-bs-toggle="modal"
            data-bs-target="#ForgotPasswordModal"
          >
            Forgot Password
          </a>
        </div>

        <Link to="/SignUp" className="link">
          <button type="" className="btn btn-success mt-5">
            {" "}
            Sign up
          </button>
        </Link>
      </div>

      {/* modals */}
      <div
        className="modal h-auto"
        id="ForgotPasswordModal"
        tabindex="-1"
        aria-labelledby="ForgotPasswordModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog mx-auto mt-0">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-4 mx-2"
                id="ForgotPasswordModalLabel"
              >
                Reset Password
              </h1>
              <button
                type="button"
                className="btn-close btn-outline-warning"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="" method="" className="forgotton-password-form">
                <div className="col-xs-12 col-md-10 mx-auto">
                  <input
                    type="email"
                    name="resetemail"
                    id="resetemail"
                    className="login-input mb-4 mt-2 form-control"
                    placeholder="Email Address"
                    required
                  ></input>
                </div>

                <div className="col-xs-12 col-md-10 mx-auto">
                  <input
                    id="resetpassword"
                    type="password"
                    name="resetpassword"
                    className="login-input mb-4 form-control"
                    placeholder="Create New Password"
                    required
                  ></input>
                </div>

                <div className="col-xs-12 col-md-10 mx-auto">
                  <input
                    id="resetpassword2"
                    type="password"
                    name="resetpassword2"
                    className="login-input mb-4 form-control"
                    placeholder="Re-enter Password"
                    required
                  ></input>
                </div>
                <div className="alert alert-danger" id="reseterror"></div>

                <button
                  onClick={checkPassword}
                  type="submit"
                  className="btn btn-outline-warning"
                >
                  Reset
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
