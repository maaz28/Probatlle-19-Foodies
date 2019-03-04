import React from 'react';
import {
  Router,
  Route
} from 'react-router-dom';
import history from './history';
import Home from '../components/Home';
import Single from '../components/single/Single';

const BasicRouting = (props) => {
  return ( 
    <Router history={history}>
    <div>
        <Route exact path="/" component={Home}/>
        <Route exact path="/single-details" component={Single}/>
    </div>
    </Router>
  )
}


export default (BasicRouting);