import React, { Component } from 'react';
import banner_img from '../../images/map.jpg'

class Banner extends Component {
  render() {
    return (
			<div class="map" style = {{backgroundImage: 'url(' + banner_img + ')', backgroundSize : 'cover', backgroundPosition : 'center', backgroundRepeat : 'no-repeat', width : "100%", height : '400px'}}>
			{/* <img src={banner_img} alt="" /> */}
		</div>
    );
  }
}

export default Banner;
