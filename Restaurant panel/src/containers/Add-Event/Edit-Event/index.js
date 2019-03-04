import React, { Component } from 'react';
import Navbar from '../../navbar';
import Footer from '../../footer';
import EditEventContainer from './EditEventContainer';
import '../style.css'

class EditEvent extends Component {

  render() {
    return (
      <div>
      <Navbar/>
      <EditEventContainer/>
      <Footer/>
      </div>
    );
  }
}


export default (EditEvent);
