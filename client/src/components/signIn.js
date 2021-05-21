import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { SignInView } from "../views/signInView";
import "./signIn.css";

const SignIn = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);
  const [isSignIn, setIsSignIn] = useState(true);
  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");

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
        if (!data.error) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("jwt", data.jwt);
          dispatch({ type: "USER", payload: data.user });
          history.push("/");
          return;
        }
        setLoginError(data.error);
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
    if (password.value !== confirm.value)
      setRegisterError("Password Not Matched!");
    fetch("/register", { method: "POST", body: formdata })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setRegisterError("");
          setIsSignIn(true);
          return;
        }
        setRegisterError(data.error);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = () => setIsSignIn((prev) => !prev);
  return (
    <SignInView
      isSignIn={isSignIn}
      handleChange={handleChange}
      handleLogin={handleLogin}
      handleRegister={handleRegister}
      loginError={loginError}
      registerError={registerError}
    />
  );
};

export default SignIn;
