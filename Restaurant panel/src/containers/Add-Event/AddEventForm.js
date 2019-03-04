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
        name: "Burgerlab",
        formatted_address: "Block 2, Gulshan Iqbal, Karachi",
        formatted_address_short: "Gulshan Iqbal",
        website: "www.pizzahut.pk",
        formatted_phone_number: "+923238364646",
        description: "Best Pizzas in town",
        banner_image : "",
        cost : '',
        food_type : '',
        facebook_url : '',
  dialogOpen : false,
  loader : false
}


closePopupHandler = () => {
  this.setState({
    dialogOpen : false
  });
  history.push('/')
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
      let obj = {
        name: this.state.name,
        email : this.props.email,
        password : this.props.password,
        formatted_address: this.state.formatted_address,
        formatted_address_short: this.state.formatted_address_short,
        website: this.state.website,
        formatted_phone_number: this.state.formatted_phone_number,
        description: this.state.description,
        banner_image : this.state.banner_image,
        cost : this.state.cost,
        food_type : this.state.food_type,
        facebook_url : this.state.facebook_url,
      }
        post_request(api_base_url + '/portal/place-register', obj)
        .then((res) => {
          this.setState({
            loader : false,
            dialogOpen : true,
            title : '',
            short_description : '',
            description : '',
            venue : '',
            website_link : '',
            title_image : '',
            food_type: "",
            facebook_url: "",
            cost: 1,
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
      banner_image : url
    })
  }


  render() {

    return (
      <div>
      <EventForm onChangeParentHandler = {this.onChangeParentHandler}/>
        <div>
        <h4 className = "title">Banner Image</h4>
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
        <ConfirmationDialog closePopupHandler = {this.closePopupHandler} open = {this.state.dialogOpen} title = "You've applied for listing at Foodies" preview = "/dashboard"/>
      </div>
      </div>
    );
  }
}

function mapStateToProp(state) {
  return ({
    name : state.user_reducer.name,
    email : state.user_reducer.email,
    password : state.user_reducer.password
  })
}

export default connect(mapStateToProp, null)(AddEventForm);