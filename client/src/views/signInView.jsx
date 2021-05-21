export const SignInView = ({
  isSignIn,
  handleChange,
  handleLogin,
  handleRegister,
  registerError,
  loginError,
}) => {
  switch (isSignIn) {
    case true:
      return (
        <div className="container">
          <div className="sidenav">
            <div className="login-main-text">
              <h1 className="text-success">WeTalk</h1>
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
                      required
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
                      required
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
                    <button
                      onClick={handleChange}
                      style={{ cursor: "pointer" }}
                      className="text text-primary m-0 border-0 bg-transparent"
                    >
                      Don't Have an Account?
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <p className="text-danger mt-2">{loginError}</p>
          </div>
        </div>
      );
      break;
    case false:
      return (
        <div className="container">
          <div className="sidenav">
            <div className="login-main-text">
              <h1 className="text-success">WeTalk</h1>
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
                      required
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
                      required
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      required
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
                    <button
                      onClick={handleChange}
                      style={{ cursor: "pointer" }}
                      className="text text-primary m-0 border-0 bg-transparent"
                    >
                      Have an Account?
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <p className="text-danger mt-2">{registerError}</p>
          </div>
        </div>
      );
      break;
    default:
      return <h2>Something went wrong!</h2>;
  }
};
