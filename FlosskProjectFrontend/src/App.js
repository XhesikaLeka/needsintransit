import React from "react";
import { Main, LandingPage } from "./Screens";

import { Route, Link, Redirect, Switch, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path={[
            "/",
            "/about",
          ]}
        >
          <Route exact path="/" component={Main} />
          <Route exact path="/about" component={LandingPage} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
