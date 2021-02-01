import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("jwt") || "");

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {token ? <Home token={token} /> : <Redirect to="login" />}
        </Route>
        <Route exact path="/login">
          {token ? <Redirect to="/" /> : <Login setToken={setToken} />}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
