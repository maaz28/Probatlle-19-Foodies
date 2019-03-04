import React, { Component } from 'react';
import Navbar from '../navbar';
import Footer from '../footer';
import AllEventsContainer from './AllEventsContainer';


class AllEvents extends Component {



  render() {
    return (
      <div className="App">
      <Navbar/>
      <AllEventsContainer />
      <Footer/>
      </div>
    );
  }
}

export default AllEvents;
