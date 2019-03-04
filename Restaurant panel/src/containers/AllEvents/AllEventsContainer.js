import React, { Component } from 'react';
import CardView from '../../components/shared/card'
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import { get_request, delete_request, put_request, post_request } from '../../utils/helper';
import { api_base_url } from '../../config/api-configuration';
import Typography from '@material-ui/core/Typography';
import history from '../../config/history';
import {Link} from 'react-router-dom';
import { DETAILS_OF_EVENT } from '../../redux/actions/event-actions';
import SearchInput, {createFilter} from 'react-search-input'
import { Divider } from '@material-ui/core';
import './style.css'


const KEYS_TO_FILTERS = ['title'];
class AllEventsContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      data : [],
      noEvents : false
    }
    this.searchUpdated = this.searchUpdated.bind(this)
  }

componentDidMount(){
  // Temporary routes
  get_request(api_base_url + '/auth/get-all-events')
  .then((res) => {
    console.log(res)
    if(res.data.results.length === 0){
      this.setState({
        noEvents : true
      })
    } else {        
      this.setState({
        data : res.data.results     
      })
    }
  })
}

  parentClickHandler = (data) => {
    this.props.detailsOfEvent(data);
    history.push('/event-details');
  }
  
  editHandler = (id) => {
    var result = this.state.data.find(obj => {
      return obj._id === id
    })
    let obj = result;
    obj.edit = true;
    this.props.detailsOfEvent(obj);
    history.push('/edit-event')
  }

  deleteHandler = (id) => {
    console.log(id)
  delete_request(api_base_url + '/event/' + id, { owner_id : this.props.uuid } )
  .then((res) => {
    console.log(res);
    window.location.reload();
  })
  }

  inviteHandler = (event_id) => {
    console.log(event_id)
  }

  interestCLickHandler = ( event_id ) => {
   let uuid = this.props.uuid
   return(
    new Promise(function(resolve, reject) {
      let obj = {
        eventId : event_id,
        userId : uuid
      } 
      console.log(obj)
      post_request(api_base_url + "/event/interested-event")
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
    var filteredeventData;

    if(this.state.data.length !== 0){
      console.log(this.state.data)
      filteredeventData = this.state.data.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    }
else{

}
    return (
        <React.Fragment>
        <div style = {{margin : '16px'}}>
        <Typography variant="h4" gutterBottom align = "center">
        All Events
      </Typography>
        </div>
  <div class="main" style = {{padding : 0}}> 
		<div class="wrap">
			<div class="section group">
    {(this.state.noEvents) ? (
<Typography variant="subtitle2" gutterBottom align = "center">
No Events to show right now
</Typography>
    ) : (
      <React.Fragment>
      <SearchInput className="search-input" onChange={this.searchUpdated} />
      {/* <Divider/> */}
      <Grid container spacing={24}>
      {
        (this.state.data.length !== 0) ? 
        (filteredeventData.map((item, i) => {
          return(
      <Grid item xs = {12} sm = {6} md = {4} key = {i}>
          <CardView 
          details = {item} 
          parentClickHandler = {this.parentClickHandler} 
          editHandler = {this.editHandler}
          deleteHandler = {this.deleteHandler}
          login = {this.props.login}
          inviteHandler = {this.inviteHandler}
          interestCLickHandler = {this.interestCLickHandler}
          />
          </Grid>  
          )
        }))
      : null
      }
      </Grid>
      </React.Fragment>
    )}
			</div>
		</div>
	</div>
    </React.Fragment>
    )
  }

  searchUpdated (term) {
    console.log(term)
  this.setState({searchTerm: term})
}

}

function mapStateToProp(state) {
  return ({
      uuid : state.user_reducer.uuid,
      login : state.user_reducer.is_login
  })
}

function mapDispatchToProp(dispatch) {
	return ({
		detailsOfEvent : (data) => {
			dispatch(DETAILS_OF_EVENT(data));
		}
	})
}

export default connect(mapStateToProp, mapDispatchToProp)(AllEventsContainer)