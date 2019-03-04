import React, { Component } from 'react';
import Banner from './Banner.js'
 import '../css/style.css';
import '../css/bootstrap/bootstrap.min.css';
import Listing from './listing/listing'
import Footer from './footer';
import Navbar from './Navbar';


class Home extends Component {

    render() {
        return (
    <div>
    <Navbar/>
    <Banner/>
    <Listing/>
    <Footer/>
    </div>
        )
    }
}

export default (Home);
