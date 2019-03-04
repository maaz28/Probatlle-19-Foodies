import React, { Component } from 'react';
import SignIn from '../../components/SignIn';
import history from '../../config/history';
import { post_request } from '../../utils/helper';
import {db, auth, api_base_url} from '../../config/api-configuration';
import { connect } from 'react-redux';
import { USER_LOGGEDIN } from '../../redux/actions/root.action';

class LoginContainer extends Component {

  state = {
    errorMessage : ''
  }


  submitHandler = (data) => {
    // let that = this;
    // console.log(data);
    // auth.signInWithEmailAndPassword(data.email, data.password)
    // .then((snapshot) => {
    //   let uuid = snapshot.user.uid;
    //   // console.log();
    //   db.ref('/users/').once('value', (snapshot) => {
    //     console.log(snapshot.val());
    //     let obj = snapshot.val();
    //     // obj.uid = uuid
    //     that.props.USER_LOGGEDIN(obj);
    //   history.push('/dashboard');
    //   })
    // })
    // .catch(function(error) {
    //   var errorMessage = error.message;
    //   that.setState({
    //     errorMessage
    //   })
    //   // ...
    // });

    post_request(api_base_url + '/portal/place-login', data)
        .then(res => {
          console.log(res);
          if(res.responseCode === 500) {
              this.setState({
                errorMessage : res.responseMessage
              })
          }
          else{
            this.props.USER_LOGGEDIN(res.data.result);
          }
        })
  }

  render() {
    return (
      <div className="App">
      <SignIn submitHandler = {this.submitHandler} errorMessage = {this.state.errorMessage}/>
      </div>
    );
  }
}
function mapDispatchToProp(dispatch) {
	return ({
		USER_LOGGEDIN : (data) => {
			dispatch(USER_LOGGEDIN(data));
		}
	})
}

export default connect(null, mapDispatchToProp)(LoginContainer);
