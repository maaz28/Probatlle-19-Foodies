 import React, { Component } from 'react';
import DateTimePicker from '../../components/shared/DateTimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import EventForm from './FormTextFields';
import Grid from '@material-ui/core/Grid';
import ConfirmationDialog from '../../components/shared/ConfirmationDialog';
import {post_request} from '../../utils/helper'
import { connect } from 'react-redux';
import Progress from '../../components/shared/CircularProgress';
import ImageUploader from './ImageUploader';
import { api_base_url } from '../../config/api-configuration';
import history from '../../config/history';

class AddEventForm extends React.Component {
state ={
  title : '',
  short_description : '',
  description : '',
  venue : '',
  tickets : '',
  website_link : '',
  title_image : '',
  start_time : new Date().getTime(),
  end_time : new Date().getTime(),
  dialogOpen : false,
  loader : false
}


closePopupHandler = () => {
  this.setState({
    dialogOpen : false
  });
  history.push('/my-events')
}

  submitHandler = () =>{
    this.setState({
      loader : true
    })
    const stateObj = this.state;
    if(stateObj.title === '' || stateObj.description === '' || stateObj.venue === '')
    {
      alert('Some Fields Are Missing')
      this.setState({
        loader : false
      })
    }else{
      let eventObj = {
        title : stateObj.title, 
        venue : stateObj.venue,
        user : {
          name : this.props.name,
          email : this.props.email,
          id : this.props.uuid,
          avatar : this.props.avatar
        },
        date : {
          start : stateObj.start_time,
          end : stateObj.end_time,
        },
        tickets : stateObj.tickets,
        website_link : stateObj.website_link,
        image_url : stateObj.title_image,
        detail_description : stateObj.description,
        short_description : stateObj.short_description,
      }
      console.log(eventObj);
      post_request(api_base_url + '/event', eventObj)
      .then((res) => {
        let obj = {
          userId : this.props.uuid,
          eventId : res.data.result.id
        }
        post_request(api_base_url + '/event/interested-event', obj)
        .then((res) => console.log(res))
        this.setState({
          loader : false,
          dialogOpen : true,
          title : '',
          short_description : '',
          description : '',
          venue : '',
          website_link : '',
          title_image : ''
        }) 
      })
      .catch(err => console.log(err))
    }
  }

  eventStartDateHandler = (val) => {
    console.log(val)
    this.setState({
      start_time : val
    })
  }

  eventEndsDateHandler = (val) => {
    console.log(val);
    this.setState({
      end_time : val
    })
  }

  onChangeParentHandler = (name ,value) => {
    console.log(name, value)
    this.setState({
    [name]: value,
    });
  }

  singleUrlHandler = (url) => {
    console.log(url);
    this.setState({
      title_image : url
    })
  }


  render() {

    return (
      <div>  
      <EventForm onChangeParentHandler = {this.onChangeParentHandler}/>
        <div
        style = {{marginLeft: '8px', marginRight: '8px'}}
        >
        <h4 className = "title">Event Starting</h4> 
        < DateTimePicker parentDateHandler = {this.eventStartDateHandler} />
        </div>
        <div
        style = {{marginLeft: '8px', marginRight: '8px'}}
        >
        <h4 className = "title">Event Ending</h4>
        < DateTimePicker parentDateHandler = {this.eventEndsDateHandler} />
        </div>
        <div>
        <h4 className = "title">Display Image (500 * 500)</h4>
        <div>
        <ImageUploader urlHandler = {this.singleUrlHandler}/>
        </div>
        </div>
      <div>
      <Grid container spacing={24}>
          <Grid item xs={2}>
          <RaisedButton style = {{marginTop : '20px'}} label="Submit" primary={true} onClick = {this.submitHandler} />
          </Grid>
          <Grid item xs={10}>
          {
            (this.state.loader) ? (
              <Progress/>
            ) : (null)
          }
          </Grid>
      </Grid>
        <ConfirmationDialog closePopupHandler = {this.closePopupHandler} open = {this.state.dialogOpen} title = "Your Event is Live Now" preview = "/view-events"/>
      </div>
      </div>
    ); 
  }
}

function mapStateToProp(state) {
  return ({
    name : state.user_reducer.name,
    email : state.user_reducer.email,
    uuid : state.user_reducer.uuid,
    avatar : state.user_reducer.avatar
  })
}

export default connect(mapStateToProp, null)(AddEventForm);