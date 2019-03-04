import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../images/logo.png';
import { connect } from 'react-redux';
import MenuListComposition from '../components/shared/popoverMenu'
import { USER_LOGGEDOUT } from '../redux/actions/root.action';
import Grid from '@material-ui/core/Grid';
import history from '../config/history';
import MediaQuery from 'react-responsive';

class Navbar extends Component{

	logoutHandller = () => {
		this.props.USER_LOGGEDOUT();
	}

	invitesHandler = () => {
		history.push('/invite-requests');
	}

	myEventsHandler = () => {
		history.push('/my-events')
	}

	interestHandler = () => {
		history.push('/interested-events')
	}


    render(){ 
        return(
			<div class="header-top">
			<div class="wrap">
				<div class="logo">
					<a href="index.html"><img src={Logo} alt="" /></a>
				</div>
				<div class="cssmenu">
				<MediaQuery maxDeviceWidth={700}>
				{(matches) => {
					if (matches) {
					return (
					<div style = {{color : 'white', marginTop : '20px'}}>
							<Link to = "/" style = {{color : 'white', marginRight : '5px'}}> Home </Link>
							<Link to = "/all-events" style = {{color : 'white'}}>All Events</Link>
					</div>
					);
					} else {
					return (
						<nav id="nav" role="navigation">
						<a href="#nav" title="Show navigation"> </a>
						<a href="#" title="Hide navigation">Hide navigation</a>
						<ul class="clearfix">
							<li class="active"><a href="javascript:void(0)"><span><Link to = "/"> Home </Link></span></a></li>
							<li><a href="javascript:void(0)"><span><Link to = "/all-events">All Events</Link></span></a></li>
							<div class="clear"></div>
						</ul>
					</nav>
					);
					}
				}}
				</MediaQuery>
				</div>
				<div class="buttons" >
					<div class="login_btn">
					{(this.props.isLogin) ? (
						<Link to = "/"> Hi, {this.props.name} </Link>
						): (
						<Link to = "/sign-up"> Signup </Link>
					)}
					</div>
					<div class="get_btn"> 
					{
						(this.props.isLogin) ? (
							<Grid container spacing={24}>
								<Grid item md={4} xs = {4}>
								<MenuListComposition 
								myEventsHandler = {this.myEventsHandler}
								logoutHandller = {this.logoutHandller} 
								invitesHandler = {this.invitesHandler}
								interestHandler = {this.interestHandler}
								avatarValue = {this.props.avatar}/>
								</Grid>
								<Grid item md={8} xs = {8}>
								<Link to = "/add-event"> + Add Event </Link> 
								</Grid>							
							</Grid>
						) : (
							// <Link to = "/sign-in"> + Add Event </Link> 
						<Link to = "/sign-in"> Login </Link>
						)
					}
					</div>
					<div class="clear"></div>
				</div>
				<div class="clear"></div>
				<h2 class="head">Find the <span class="m_1">next event </span>You'll want <span class="m_1">to attend</span></h2>
			</div>
		</div>
        )
    }
}

function mapDispatchToProp(dispatch) {
	return ({
		USER_LOGGEDOUT : () => {
			dispatch(USER_LOGGEDOUT());
		}
	})
}

function mapStateToProp(state) {
	console.log(state)
	return ({
		isLogin : state.user_reducer.is_login,
		name : state.user_reducer.name,
		avatar : state.user_reducer.avatar
	})
}



export default connect(mapStateToProp, mapDispatchToProp)(Navbar)