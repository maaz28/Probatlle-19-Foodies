import React, { Component } from 'react';
 
import SignupContainer from './SignupContainer';
import history from '../../config/history'

class Signup extends Component {

  signupHandler = () => {
    history.push('/sign-up');
  }

  render() {
    return (
      <div className="App">
      <SignupContainer signupHandler = {this.signupHandler}/>
      </div>
    );
  }
}

export default Signup;
