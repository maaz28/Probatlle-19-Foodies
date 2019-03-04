import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'


library.add(fab, faCoffee)
class Footer extends Component {
  render() {
    return (
		<div class="footer">
		<div class="wrap">
			<div class="footer-bottom">
				<div class="copy">
					<p>© 2019 Developed by<a href="javascript:void(0)" target="_blank" style = {{color : '#F50057'}}> Krish</a></p>
				</div>
				<div class="social">
					<ul>
						<li class="facebook"><a href="#"><span> </span></a></li>
						<li class="twitter"><a href="#"><span> </span></a></li>
						<li class="linked"><a href="#"><span> </span></a></li>
						<li class="arrow"><a href="#"><span> </span></a></li>
						<li class="dot"><a href="#"><span> </span></a></li>
						<li class="rss"><a href="#"><span> </span></a></li>
					</ul>
				</div>
				<div class="clear"></div>
			</div>
		</div>
	</div>
    );
  }
}

export default Footer;
