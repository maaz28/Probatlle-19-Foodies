import React from 'react';
import {
  Router,
  Route,
  HashRouter,
  Redirect
} from 'react-router-dom';
import history from './history';
import Login from '../containers/Login';
// import SingleEvent from '../containers/Single-event-page.js';
// import AddEvent from '../containers/Add-Event';r
// import InviteRequests from '../containers/Invitation';
// import MyEvent from '../containers/MyEvent';
// import EditEvent from '../containers/Add-Event/Edit-Event';
// import interestedEvents from '../containers/InterestedEvents'
// import AllEvents from '../containers/AllEvents';
import {connect} from 'react-redux';
import Main from '../containers/Main';

const Routing = (props) => {
  return (
    <HashRouter>
      <Structure login = {props.login}/>
    </HashRouter>
  )
}

const Structure = (props) => {
  return(
  <Main login = {props.login}/>
  )
}


function mapStateToProp(state) {
  console.log(state.user_reducer.is_login)
  return ({
    login : state.user_reducer.is_login
  })
}

export default connect(mapStateToProp, null)(Routing);