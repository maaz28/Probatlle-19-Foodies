import React, { Component } from 'react';
import Banner from './Banner';
import EventSearch from './Search';
import Featured from './Featured';
import CalenderListView from './CalenderListView';
import { Divider } from '@material-ui/core';
import {connect} from 'react-redux';


class Home extends Component {
  render() {
    return (
		<div>
        <Divider/>
        {/* {this.props.login ? 
        <CalenderListView/> : null} */}
        <Divider/>
        <Banner/>
        {/* <EventSearch/> */}
        <Featured/>
	  </div>
    )
  }
}

function mapStateToProp(state) {
  console.log(state.user_reducer.is_login)
  return ({
    login : state.user_reducer.is_login
  })
}


export default connect(mapStateToProp, null)(Home);
