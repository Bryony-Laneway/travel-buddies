import { Outlet, Link } from "react-router-dom";

const Layout = ({ onLogout, user }) => {
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg fixed-top bg-body-white">
          <div className="container-fluid">
            <Link
              className="home-link"
              href="localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="./images/logo.png" alt="name" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggler"
              aria-controls="navbarToggler"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarToggler">
              <ul className="navbar-nav mb-2 mb-lg-0">
                {/* <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li> */}
                <li className="nav-item">
                  <Link className="nav-link" to="/Upcoming">
                    Upcoming
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Past">
                    Past
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Photos">
                    Photos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Buddies">
                    Buddies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Profile">
                    {user && user.profilePic ? (
                      <img
                        className="navbar-profile-pic"
                        src={`http://localhost:3333/uploads/profile-pics/${user.profilePic}`}
                        alt="Profile"
                      />
                    ) : (
                      <img
                        className="navbar-profile-pic"
                        src="http://localhost:3333/uploads/profile-pics/blank-avatar.jpg"
                        alt="Profile"
                      />
                    )}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={onLogout}
                    className="btn btn-outline-warning mt-2"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="container">
        <div className="content col-10 mx-auto">
          <Outlet />
        </div>
      </div>
      <footer className="footer mt-5">
        <div className="row mt-5">
          <img src="./images/logo.png" alt="logo" className="footer-logo" />
        </div>
        <div className="row">
          <p className="copyright">
            Designed and Developed by Bryony and Evandro
          </p>
        </div>
        <div className="row">
          <a
            className="footer-link mb-3 mt-5"
            data-bs-toggle="modal"
            data-bs-target="#contactModal"
          >
            Contact Us
          </a>
          <a
            className="footer-link mb-5"
            data-bs-toggle="modal"
            data-bs-target="#privacyModal"
          >
            Pivacy Policy
          </a>
        </div>
      </footer>

      {/* modals */}
      <div
        className="modal h-auto"
        id="contactModal"
        tabindex="-1"
        aria-labelledby="contactModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog mx-auto">
          <div className="mode-content">
            <div className="modal-header">
              <h1 className="modal-title fs-4 mx-2" id="contactModalLabel">
                Contact Us
              </h1>
              <button
                type="button"
                className="btn-close btn-outline-warning"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>
            <div className="modal-body">
              <h6 className="mx-auto mt-5 mb-5">
                If you need some assistance feel free to contact us and the team
                here at Travel Buddies will do our best to help!
              </h6>
              <p>Phone us on 0432 123 456</p>
              <p>Email us at travelbuddies@outlook.com</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade scrollable modal-open-scroll modal-lg"
        id="privacyModal"
        tabindex="-1"
        aria-labelledby="privacyModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable mt-0 mb-0">
          <div className="mode-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="privacyModalLabel">
                Privacy Policy
              </h1>
              <button
                type="button"
                className="btn-close btn-outline-warning"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>
            <div className="modal-body modal-body-scrollable">
              <p>
                Travel Buddies is committed to providing quality services to you
                and this policy outlines our ongoing obligations to you in
                respect of how we manage your Personal Information. We have
                adopted the Australian Privacy Principles (APPs) contained in
                the Privacy Act 1988 (Cth) (the Privacy Act). The NPPs govern
                the way in which we collect, use, disclose, store, secure and
                dispose of your Personal Information. A copy of the Australian
                Privacy Principles may be obtained from the website of The
                Office of the Australian Information Commissioner at
                https://www.oaic.gov.au/.
              </p>
              <p>
                Your Personal Information may be disclosed in a number of
                circumstances including the following: • Third parties where you
                consent to the use or disclosure; and • Where required or
                authorised by law.
              </p>
              <p>
                If you have any queries or complaints about our Privacy Policy
                please contact us at: Travel Buddies, travelbuddies@outlook.com,
                0432 123 456
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
