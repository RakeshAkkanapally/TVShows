import { makeStyles } from "@material-ui/core";
import Showpage from "./pages/Showpage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboardpage from "./pages/Dashboardpage";
import React from "react";
import NotFoundpage from "./pages/NotFoundpage";
import Episodepage from "./pages/Episodepage";
import { ErrorBoundary } from "react-error-boundary";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#000",
    height: "100vh",
    overflowX: "hidden",
  },
});

function App() {
  const classes = useStyles();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className={classes.root}>
        <Router>
          <Switch>
            <Route exact path="/" component={Dashboardpage} />
            <Route path="/search" component={Dashboardpage} />
            <Route exact path="/show/:id" component={Showpage} />
            <Route
              exact
              path="/show/:id/episodes/:snum/:epnum"
              component={Episodepage}
            />
            <Route path="*" component={NotFoundpage} />
          </Switch>
        </Router>
      </div>
    </ErrorBoundary>
  );
}

function ErrorFallback() {
  return <h1>Something went wrong.</h1>;
}

export default App;
