import Homepage from './pages/Homepage'
import Header from './components/Header';
import { makeStyles } from '@material-ui/core';
import Showpage from './pages/Showpage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PopularShowspage from './pages/PopularShowspage';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#000',
    height: '100vh',
    overflowX: 'hidden'
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={PopularShowspage}/>
          <Route exact path="/home" component={Homepage}/>
          <Route exact path="/show/:id" component={Showpage}/>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
