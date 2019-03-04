import React, { Component } from 'react';
import DateTimePicker from '../../../components/shared/DateTimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import EventForm from './FormTextFields';
import Grid from '@material-ui/core/Grid';
import ConfirmationDialog from '../../../components/shared/ConfirmationDialog';
import { connect } from 'react-redux';
import Progress from '../../../components/shared/CircularProgress';
import ImageUploader from '../ImageUploader';
import { api_base_url } from '../../../config/api-configuration';
import { put_request } from '../../../utils/helper';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'; 
import history from '../../../config/history'


class EditEventForm extends React.Component {
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

componentDidMount () {
    const {details} = this.props;
    this.setState({
      start_time : details.date.start,
      end_time : details.date.end,
      title : details.title,
      short_description : details.short_description,
      description : details.detail_description,
      venue : details.venue,
      tickets : details.tickets,
      website_link : details.website_link,
      title_image : details.image_url,
    })
}

closePopupHandler = () => {
  this.setState({
    dialogOpen : false
  })
  history.push('/my-event')
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
          id : this.props.id,
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
      put_request(api_base_url + '/event/' + this.props.details._id, eventObj)
      .then((res) => {
        console.log(res);
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

  multipleUrlHandler = (url) => {
    console.log(url);
    let arr = this.state.photos;
    arr.push(url);
    this.setState({
      photos : arr
    })
  }

  deleteBtnHandler = () => {
    this.setState({
      title_image  : ''
    })
  }

  render() {

    return (
      <div>  
      <EventForm onChangeParentHandler = {this.onChangeParentHandler} details = {this.props.details}/>
        <div
        style = {{marginLeft: '8px', marginRight: '8px'}}
        >
        <h4 className = "title">Event Starting</h4> 
        < DateTimePicker parentDateHandler = {this.eventStartDateHandler} ms = {this.props.details.date.start}/>
        </div>
        <div
        style = {{marginLeft: '8px', marginRight: '8px'}}
        >
        <h4 className = "title">Event Ending</h4>
        < DateTimePicker parentDateHandler = {this.eventEndsDateHandler} ms = {this.props.details.date.end}/>
        </div>
        <div>
        <h4 className = "title">Display Image (500 * 500)</h4>
        {
    (this.state.title_image) ? (
      <div style={{ backgroundImage: 'url(' + this.state.title_image + ')', backgroundSize : 'cover', backgroundPosition : 'center', backgroundRepeat : 'no-repeat', width : '100px', height : '100px' }}>
      <DeleteOutlinedIcon title = "Delete" style = {{color : 'red', cursor : 'pointer'}} onClick = {this.deleteBtnHandler}/>
      </div>
    ) : (
      <ImageUploader urlHandler = {this.singleUrlHandler}/>
    )
        }
        <div>
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
        <ConfirmationDialog closePopupHandler = {this.closePopupHandler} open = {this.state.dialogOpen} title = "Event has been Updated" preview = "/view-events"/>
      </div>
      </div>
    ); 
  }
}

function mapStateToProp(state) {
  return ({
    name : state.user_reducer.name,
    email : state.user_reducer.email,
    id : state.user_reducer.uuid,
    avatar : state.user_reducer.avatar,
    details : state.event_reducer
  })
}

export default connect(mapStateToProp, null)(EditEventForm);