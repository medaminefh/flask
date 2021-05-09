import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Nav = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const notLoggedIn = (
    <ul className="navbar-nav ml-auto mt-2 mt-lg-0 align-items-center">
      <li>
        <Link className=" black-text text-darken-2" to="/login">
          Login
        </Link>
      </li>
      <li>
        <Link className=" black-text text-darken-2" to="/signup">
          Signup
        </Link>
      </li>
    </ul>
  );
  const loggedIn = (
    <ul className="navbar-nav ml-auto mt-2 mt-lg-0 align-items-center">
      <li>
        <Link className=" black-text text-darken-2" to="/profile">
          Profile
        </Link>
      </li>
      <li>
        <Link className=" black-text text-darken-2" to="/mysub">
          My Followers
        </Link>
      </li>
      <li>
        <Link className=" black-text text-darken-2" to="/create">
          Create A Post
        </Link>
      </li>
      <li>
        <button
          onClick={(e) => {
            localStorage.clear();
            dispatch({ type: "CLEAR" });
            history.push("/login");
          }}
          className="red darken-1 btn waves-effect waves-light"
        >
          Logout
        </button>
      </li>
    </ul>
  );
  const renderList = state ? loggedIn : notLoggedIn;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light static-top">
      <Link to={state ? "/" : "/login"} className="navbar-brand">
        weTalk
      </Link>
      {renderList}
    </nav>
  );
};

export default Nav;
