function check() {
  var password = document.getElementById("password").value;
  var password2 = document.getElementById("password2").value;
  var errorMessage = document.getElementById("error");
  var errorToThrow = "";

  try {
    if (password.length < 6) {
      errorToThrow += "<br /> Password is too short";
    }
    if (/[A-Z]/g.test(password) === false) {
      errorToThrow +=
        "<br /> Password should include at least one capital letter";
    }
    if (/\d/g.test(password) === false) {
      errorToThrow += "<br /> Password should include at least one number";
    }
    if (password !== password2) {
      errorToThrow += "<br /> Passwords must match";
    }
    throw errorToThrow;
  } catch (err) {
    document.getElementById("error").style.visibility = "visible";
    errorMessage.innerHTML = err;
  }
}

function handleSubmit(e) {
  //prevent page reload
  e.preventDefault();
  // read form data
  const form = e.target;
  const formData = new FormData(form);

  //pass formData as fetch body
  fetch("http://localhost:3333/register", {
    method: form.method,
    body: formData,
  });
}

const SignUp = () => {
  return (
    <div className="container">
      <div className="login">
        <img src="./images/logo.png" alt="logo" className="mt-5 mb-5" />

        <form
          action=""
          method="post"
          className="login-form"
          onSubmit={handleSubmit}
        >
          <div className="col-xs-10 col-md-4 mx-auto">
            <input
              type="text"
              name="name"
              id="name"
              className="login-input mb-4 mt-2 form-control"
              placeholder="First Name"
              required
            ></input>
          </div>

          <div className="col-xs-10 col-md-4 mx-auto">
            <input
              type="text"
              name="surname"
              id="surname"
              className="login-input mb-4 mt-2 form-control"
              placeholder="Surname"
              required
            ></input>
          </div>

          <div className="col-xs-10 col-md-4 mx-auto">
            <input
              type="email"
              name="email"
              id="email"
              className="login-input mb-4 mt-2 form-control"
              placeholder="Email Address"
              required
            ></input>
          </div>

          <div className="col-xs-10 col-md-4 mx-auto">
            <input
              id="password"
              type="password"
              name="password"
              className="login-input mb-4 form-control"
              placeholder="Create Password"
              required
            ></input>
          </div>

          <div className="col-xs-10 col-md-4 mx-auto">
            <input
              id="password2"
              type="password"
              name="password2"
              className="login-input mb-4 form-control"
              placeholder="Re-enter Password"
              required
            ></input>
          </div>
          <div className="alert alert-danger" id="error"></div>

          <button
            onClick={check}
            type="submit"
            className="btn btn-outline-warning"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
