import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SearchBar from '../../components/shared/searchBar';
import { get_request, post_request } from '../../utils/helper'; 
import { api_base_url } from '../../config/api-configuration';
import {connect} from 'react-redux';
import SuccessSnackbar from '../../components/shared/SuccessSnackbar';


class SimpleDialog extends React.Component {
  state = {
    open: false,
    data : [],
    selectedValue : 'name',
    eventId : '',
    receiverId : ''
  };

  selectHandler = (value) => {
    this.setState({
      receiverId : value._id
    })
  }

  componentDidMount () {
    var useragent = navigator.userAgent;
    if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
      this.setState({onMobileDevice : true})
  }
    // console.log(this.props.eventId)
    get_request(api_base_url + '/auth/get-all-users')
    .then((res) => {
      let array = res.data.results;
        for(var i=0; i<array.length ; i++){
          array[i].value = array[i].name
        }
      console.log(array)
      this.setState({
          data : array,
          eventId : this.props.event_id,
          success : false
      })
    })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  changeHandler = (value) => {
    
    console.log(value)
    let array = this.state.data;
    switch (value) {
      case "name":
      for(var i=0; i<array.length ; i++){
        array[i].value = array[i].name
      }
        break;
      case "email":
      for(var i=0; i<array.length ; i++){
        array[i].value = array[i].email
      }
        break;
      default:
        break;
    }
    console.log(array)
    this.setState({
        data : array
    })
  } 

  inviteHandler = () => {
    let obj = {
      senderId : this.props.uuid,
      receiverId : this.state.receiverId,
      eventId : this.state.eventId
    }
    post_request(api_base_url+'/event/invitation', obj)
    .then(res => {
      if(res.responseCode === 201){
        this.setState({
          success : true
        })
        setTimeout(() => {
          this.setState({
            success : false
          })
        }, 3000)
        this.handleClose()
      }
    })
    console.log(obj);
  }

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" title = "invite friends" onClick={this.handleClickOpen}>
          Invite  
        </Button>
        <Dialog
        fullScreen = { (this.state.onMobileDevice) ? true : false}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Select a user to send invitation"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
          <SearchBar 
          changeHandler = {this.changeHandler}
          data = {this.state.data}
          selectHandler = {this.selectHandler}
          />
            </DialogContentText>
          </DialogContent >
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.inviteHandler} color="primary" autoFocus>
            Invite
            </Button>
          </DialogActions>
        </Dialog>
        {(this.state.success) ? (<SuccessSnackbar message = "invitation has been sent"/>) : null}
      </div>
    );
  }
}


function mapStateToProp(state) {
  console.log(state.user_reducer.is_login)
  return ({
    uuid : state.user_reducer.uuid
  })
}



export default connect(mapStateToProp, null) (SimpleDialog);