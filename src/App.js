import { makeStyles } from "@material-ui/core";
import Showpage from "./pages/Showpage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboardpage from "./pages/Dashboardpage";
import React  from "react";
import NotFoundpage from "./pages/NotFoundpage";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#000",
    height: "100vh",
    overflowX: "hidden"
  }
});

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboardpage}/>
          <Route exact path="/show/:id" component={Showpage}/>
          <Route path="*" component={NotFoundpage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
