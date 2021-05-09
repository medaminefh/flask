import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./signIn.css";

const SignIn = () => {
  const history = useHistory();
  const [isSignIn, setIsSignIn] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = e.currentTarget.elements;
    const formdata = new FormData();
    formdata.append("username", username.value);
    formdata.append("password", password.value);
    fetch("/login", { method: "POST", body: formdata })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", JSON.stringify(data.jwt));
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleRegister = (e) => {
    e.preventDefault();
    const { username, password, confirm } = e.currentTarget.elements;
    const formdata = new FormData();
    formdata.append("username", username.value);
    formdata.append("password", password.value);
    formdata.append("confirm", confirm.value);
    fetch("/register", { method: "POST", body: formdata })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  const handleChange = () => setIsSignIn((prev) => !prev);
  switch (isSignIn) {
    case true:
      return (
        <div className="container">
          <div className="sidenav">
            <div className="login-main-text">
              <h2>
                Application
                <br /> Login Page
              </h2>
              <p>Login or register from here to access.</p>
            </div>
          </div>
          <div className="main">
            <div className="col-md-6 col-sm-12">
              <div className="login-form">
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <label>User Name</label>
                    <input
                      name="username"
                      autoFocus
                      type="text"
                      className="form-control"
                      placeholder="User Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>
                  <div className="s">
                    <button type="submit" className="btn btn-black">
                      Login
                    </button>
                    <p
                      role="button"
                      onClick={handleChange}
                      className="text text-primary m-0"
                    >
                      Don't Have an Account?
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
      break;
    case false:
      return (
        <div className="container">
          <div className="sidenav">
            <div className="login-main-text">
              <h2>
                Application
                <br /> Login Page
              </h2>
              <p>Login or register from here to access.</p>
            </div>
          </div>
          <div className="main">
            <div className="col-md-6 col-sm-12">
              <div className="login-form">
                <form onSubmit={handleRegister}>
                  <div className="form-group">
                    <label>User Name</label>
                    <input
                      name="username"
                      autoFocus
                      type="text"
                      className="form-control"
                      placeholder="UserName"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      name="confirm"
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <div className="s">
                    <button type="submit" className="btn btn-black">
                      Register
                    </button>
                    <p
                      role="button"
                      onClick={handleChange}
                      className="text text-primary m-0"
                    >
                      Have an Account?
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
      break;
    default:
      return <h2>Something went wrong!</h2>;
  }
};

export default SignIn;
