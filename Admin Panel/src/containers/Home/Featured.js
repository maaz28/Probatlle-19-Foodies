import React, { Component } from 'react';
import CardView from '../../components/shared/card'
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import { get_request, post_request } from '../../utils/helper';
import { api_base_url } from '../../config/api-configuration';
import { DETAILS_OF_EVENT } from '../../redux/actions/event-actions';
import history from '../../config/history';
import Typography from '@material-ui/core/Typography';

class Featured extends Component {
  
  state = {
    data : []
  } 

  componentDidMount(){
    // Temporary routes
    get_request(api_base_url + '/auth/get-all-events')
  .then((res) => {
    console.log(res)
    if(res.responseCode === 500){
      this.setState({
        noEvents : true
      })
    } else {   
           
      this.setState({
        data : res.data.results     
      })
    }
  })
    // get_request(api_base_url + '/auth/get-all-users')
    // .then((res) => {
    //   console.log(res)
    //   this.setState({
    //     data : res.data.results  
        
    //   })
    // })
  }

  parentClickHandler = (data) => {
    this.props.detailsOfEvent(data);
    history.push('/event-details');
  }

  inviteHandler = (event_id) => {
    console.log(event_id)
  }

  interestCLickHandler = ( event_id ) => {
   let that = this;
   return(
    new Promise(function(resolve, reject) {
      let obj = {
        eventId : event_id,
        userId : that.props.uuid
      } 
      console.log(obj)
      post_request(api_base_url + "/event/interested-event", obj)
      .then((res) => {
        console.log(res)
        resolve(200)
      })
      .catch(err => reject(err))  
    }
   )
  )  
  }

  render() {
    return (
      <React.Fragment>
                <div style = {{margin : '16px'}}>
        <Typography variant="h4" gutterBottom align = "center">
        Upcoming Events
      </Typography>
        </div>
      <div style = {{margin : '16px'}}>
      </div>
        <div class="main"> 
		<div class="wrap">
			<div class="section group">
    <Grid container spacing={24}>
    { 
      (this.state.data.map((item, i) => {
        return(
    <Grid item xs = {12} sm = {6} md = {4} key = {i}>
        <CardView 
        details = {item} 
        parentClickHandler = {this.parentClickHandler} 
        inviteHandler = {this.inviteHandler}
        login = {this.props.login}
        interestCLickHandler = {this.interestCLickHandler}
        />
        </Grid>  
        )
      }))
    }
    </Grid>
			</div>
		</div>
	</div>
  </React.Fragment>

    )
  }
}

function mapStateToProp(state) {
  console.log(state.user_reducer.is_login)
  return ({
    login : state.user_reducer.is_login,
    uuid : state.user_reducer.uuid
  })
}

function mapDispatchToProp(dispatch) {
	return ({
		detailsOfEvent : (data) => {
			dispatch(DETAILS_OF_EVENT(data));
		}
	})
}

export default connect(mapStateToProp, mapDispatchToProp)(Featured)

