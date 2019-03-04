import React, { Component } from 'react';
import SignUp from '../../components/Signup';
import history from '../../config/history';
import { api_base_url } from '../../config/api-configuration';
import { connect } from 'react-redux';
import { post_request } from '../../utils/helper';
import { USER_EMAIL_PASSWORD } from '../../redux/actions/root.action';


class SignupContainer extends Component {

  state = {
    errorMessage : ''
  }

  SigninHandler = () => {
    history.push('/sign-in');
  }

  submitHandler = (data) => {
    console.log(data)
    this.props.USER_EMAIL_PASSWORD(data);
    history.push('/add-restaurant-details');
  }

  render() {
    return (
      <div className="App">
      <SignUp SigninHandler = {this.SigninHandler} submitHandler = {this.submitHandler} errorMessage = {this.state.errorMessage}/>
      </div>
    );
  }
}


function mapDispatchToProp(dispatch) {
	return ({
		USER_EMAIL_PASSWORD : (data) => {
			dispatch(USER_EMAIL_PASSWORD(data));
    }
	})
}




export default connect(null, mapDispatchToProp)(SignupContainer)
