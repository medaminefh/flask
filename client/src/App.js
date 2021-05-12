import React, { useEffect, useReducer, useContext, createContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { Home, SignIn, Nav, CreatePost } from "./components/export";
import { initialState, reducer } from "./helpers/userReducers";
export const UserContext = createContext();
export const { Provider, Consumer } = UserContext;
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
      <Route exact path="/" component={Home} />
      <Route exact path="/profile" component={Home} />
      <Route path="/signup" component={SignIn} />
      <Route path="/login" component={SignIn} />
      <Route path="/create" component={CreatePost} />
      <Route path="/profile/:userid" component={Home} />
      <Route path="/mysub" component={Home} />
    </Switch>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Provider value={{ state, dispatch }}>
      <Router>
        <Nav />
        <Routing />
      </Router>
    </Provider>
  );
};

export default App;
