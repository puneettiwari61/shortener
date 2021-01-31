import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { setAuthHeaders } from "./apis/axios";
import Home from "./components/Home";
import ShortLinkRedirect from "./components/ShortLinkRedirect";

const App = () => {
  useEffect(() => {
    setAuthHeaders();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:slug" exact component={ShortLinkRedirect} />
      </Switch>
    </Router>
  );
};

export default App;
