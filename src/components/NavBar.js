import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const history = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    } else {
      alert("Login first!!");
      history("/");
    }
  }, []);

  return (
    <div>
      <nav className={`navbar navbar-expand-lg`}>
        <div className="container-fluid">
          <div className="navbar-brand mx-3">{props.title}</div>
          {localStorage.getItem("user") != null && (
            <div className="collapse navbar-collapse mx-3" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/addStudent"
                  >
                    Add Student
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/verify"
                  >
                    Verify
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <button
                    className="btn btn-danger  mx-2"
                    onClick={() => {
                      localStorage.clear();
                      history("/");
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  mode: PropTypes.string,
};
