import React, { useEffect, useReducer, useContext, createContext } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";
import {
  Home,
  SignIn,
  Nav,
  CreatePost,
  Profile,
  UserProfile,
} from "./components/export";
import { initialState, reducer } from "./helpers/userReducers";
export const UserContext = createContext();
export const { Provider, Consumer } = UserContext;
const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={(props) =>
        localStorage.getItem("user") &&
        localStorage.getItem("jwt").length > 40 ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/login");
    }
  }, []);
  return (
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <Route path="/signup" component={SignIn} />
      <Route path="/login" component={SignIn} />
      <ProtectedRoute path="/create" component={CreatePost} />
      <ProtectedRoute path="/user/:userid" component={UserProfile} />
      <ProtectedRoute path="/mysub" component={Home} />
      <ProtectedRoute path="*" component={Home} />
    </Switch>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Provider value={{ state, dispatch }}>
      <Router>
        {state && <Nav />}
        <Routing />
      </Router>
    </Provider>
  );
};

export default App;
