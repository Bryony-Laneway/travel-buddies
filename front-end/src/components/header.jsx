export function MyHeader() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top bg-body-white">
        <div className="container-fluid">
          <a
            className="home-link"
            href="localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./images/logo.png" alt="name" />
          </a>
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
                <a className="nav-link" href="#">
                  Upcoming
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Past
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Photos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Friends
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <img
                    className="navbar-profile-pic"
                    src="./images/me.jpg"
                    alt="profile"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
