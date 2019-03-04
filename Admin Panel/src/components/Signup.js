import React, { Component } from "react";
import {validEmail, validPassword} from '../utils/helper.js'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  main: {
    width: 'auto', 
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: '#F50057',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    backgroundColor : 'black',
    marginTop: theme.spacing.unit * 3,
  },
});


class SignUp extends Component {
   
  state = {
    name : '',
    email : '',
    password : '',
    errorMessage : '',
    dob : '1996-05-24',
    loading : false,
    errorPassword : false,
    errorEmail : false,
    error : false
  }

  componentWillReceiveProps(next){
    this.setState({
      error : true,
      errorMessage : next.errorMessage
    })
  }

  emailHandler = (ev) =>{
    this.setState({
      email : ev.target.value
    })
  }

  passwordHandler = (ev) => {
    this.setState({
      password : ev.target.value
    })
  }

  nameClickHandler = (ev) => {
    this.setState({
      name : ev.target.value
    }) 
  }

  emailBlurHandler = (ev) => {
    if(!validEmail(ev.target.value)){
      this.setState({
    errorEmail : true
      })
    }
    else{
      this.setState({
        errorEmail : false
          })
    }
  }
  
  passwordBlurHandler = (ev) => {
    if(!validPassword(ev.target.value)){
      this.setState({
      errorPassword : true
      })
    }
    else{
      this.setState({
        errorPassword : false,
        error : false
          })
    }
  }

  submitBtnHandler = (ev) => {
    ev.preventDefault();
    let obj = {
      email : this.state.email,
      password : this.state.password,
      name : this.state.name,
      time : Date.now(),
      dob : this.state.dob
    }
    if((obj.email === "" || obj.password === "" || obj.name === "" || obj.dob === "" || this.state.errorEmail || this.state.errorPassword)){
      this.setState({
        error : true,
        errorMessage : 'All the fields are required!'
      })
    }
    else {
      this.setState({
        error : false
      })
      this.props.submitHandler(obj);
    }
  }


   Handler(){
    this.props.SigninHandler();
  }

  handleBirthdayChange = (ev) => {
    console.log(ev.target.value)
    this.setState({
      dob : ev.target.value
    })
  }
  
  render(){
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input 
              id="email" 
              name="email" 
              autoComplete="email" 
              autoFocus
              onChange = {this.emailHandler}
              onBlur = {this.emailBlurHandler}
              />
            </FormControl>
            <FormHelperText style = {{color : 'red'}}>{(this.state.errorEmail) ? "Email is not valid" : ""}</FormHelperText>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input 
              name="password" 
              type="password" 
              id="password" 
              autoComplete="current-password" 
              onChange = {this.passwordHandler}
              onBlur = {this.passwordBlurHandler}
              />
            </FormControl>
            <FormHelperText style = {{color : 'red'}}>{(this.state.errorPassword) ? "Password length should be atleast 6 charaters long" : ""}</FormHelperText>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Full Name</InputLabel>
              <Input 
              name="name" 
              type="name" 
              id="name" 
              autoComplete="name" 
              onChange = {this.nameClickHandler}
              onBlur = {this.nameBlurHandler}
              />
            </FormControl>
            <TextField
              id="date"
              label="Birthday"
              type="date"
              defaultValue="1996-05-24"
              onChange = {this.handleBirthdayChange}
              InputLabelProps={{
                shrink: true,
              }}
            />  
            {
              (this.state.error) ? (
          <div style = {{margin :'0px', marginTop : '8px', color : 'red'}}>
          <p>{this.state.errorMessage}</p>
          </div>
              ) : null
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {this.submitBtnHandler}
            >
              Sign up
            </Button>
          </form>
          <div style = {{margin :'0px', marginTop : '8px'}}>
          <p>Don't have an account? <a href = "javascript:void(0)" onClick = { () => {this.Handler()}}>SignIn</a> here </p>
          </div>
        </Paper>
      </main>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);