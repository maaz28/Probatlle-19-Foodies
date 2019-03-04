import React,{ Component } from "react";
import Dashboard from '../containers/Dashboard/Dashboard';
import history from "../config/history";
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import AddEvent from '../containers/Add-Event'

import {
    Router,
    Route
  } from 'react-router-dom';

export default class Main extends Component {
    
    render() {
        return (
            <Router history={history}>
            <React.Fragment>
              <div>
            {
              (this.props.login) ? (
            <React.Fragment>
                <Dashboard/> 
            </React.Fragment>
              ) : (
            <React.Fragment>
                <Route exact path = '/' component={Login}/>
                <Route  path = '/sign-up' component={Signup}/> 
                <Route  path = '/sign-in' component={Login}/>
                <Route  path = '/dashboard' component={Dashboard}/>
                <Route  path = '/add-restaurant-details' component={AddEvent}/>
                </React.Fragment>
                )
              }
                </div>
              <div>
               </div>
            </React.Fragment>
            </Router> 
          )    
    }
    
  }