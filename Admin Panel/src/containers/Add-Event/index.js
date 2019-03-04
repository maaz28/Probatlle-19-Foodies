import React, { Component } from 'react';
import Navbar from '../navbar';
import Footer from '../footer';
import AddEventContainer from './AddEventContainer';
import './style.css'

class AddEvent extends Component {

  render() {
    return (
      <div>
      <Navbar/>
      <AddEventContainer/>
      <Footer/>
      </div>
    );
  }
}


export default (AddEvent);
