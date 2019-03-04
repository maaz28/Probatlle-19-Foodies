import React, { Component } from 'react';
    import SearchedList from './searchedList'
import '../../css/bootstrap/bootstrap.min.css';
 import '../../css/style.css';

class Listing extends Component {

    render() {
        return (
            <div>
                <h2 style={{textAlign:'center', textColor: 'black', padding:'2em 0em 0em'}} >Restaurants</h2>
                
                <SearchedList/>
            </div>
        )
    } 
}

 
export default (Listing);

