import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Nav = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();

  const handleClick = (e) => {
    fetch("/logout")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        WeTalk
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link" href="#">
              publish
            </Link>
          </li>
        </ul>
        <button onClick={handleClick} className="btn btn-outline-dark">
          logout
        </button>
      </div>
    </nav>
  );
};

export default Nav;
