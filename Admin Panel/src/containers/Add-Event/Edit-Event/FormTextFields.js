import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '260px',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class EventForm extends React.Component {

  state ={
    title_err : false,
    desc_err : false,
    venue_err : false,
    titleHelperText : ''
  }

  //Events Of Dynamic Field Used to update value in the parent
  firstFieldHandler = (value) => {
    console.log(value)
    this.props.onChangeParentHandler('video', value);
  }

  addMoreFieldsHandler = (value) => {
    console.log(value)
    this.props.onChangeParentHandler('dynamicVideoUrl', value);
  }

  handleChange = name => event => {
      console.log(name, event.target.value)
      this.props.onChangeParentHandler(name, event.target.value);
  };

  titleErrHandler = (ev) => {
    console.log(ev.target.value);
    if(ev.target.value === ''){
      this.setState({
        title_err : true,
        titleHelperText : 'This Field is required'
      })
    }
    else if(ev.target.value.length > 40){
      this.setState({
        title_err : true,
        titleHelperText : 'Title is longer than 40 characters'
      })
    }
  }


  render() {
    const { classes, details } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
        defaultValue = {details.title}
          onBlur ={this.titleErrHandler}
          error = {this.state.title_err}
          helperText = {this.state.titleHelperText}
          required
          id="title"
          label="Event Name"
          className={classes.textField}
          margin="normal"
          placeholder = "New Year Night"
          onChange = {this.handleChange('title')}
          />
        <TextField
        defaultValue = {details.venue}
        error = {this.state.venue_err}
          required
          id="venue"
          label="Event Venue"
          className={classes.textField}
          margin="normal"
          placeholder = "Port Grand Hall"
          onChange = {this.handleChange('venue')}
        />
          <TextField
        defaultValue = {details.short_description}
          error = {this.state.desc_err}
            required
            fullWidth
            id="short_description"
            label="Event Description"
            multiline
            rowsMax="2"
            style = {{marginLeft: '8px', marginRight: '8px'}}     
            margin="normal"
            onChange = {this.handleChange('short_description')}
          />
          <TextField
        defaultValue = {details.detail_description}
          error = {this.state.desc_err}
            required
            fullWidth
            id="Description"
            label="Detailed Description"
            multiline
            rowsMax="2"
            style = {{marginLeft: '8px', marginRight: '8px'}}     
            margin="normal"
            onChange = {this.handleChange('description')}
          />
          <TextField
        defaultValue = {details.tickets}
          fullWidth        
          style = {{marginLeft: '8px', marginRight: '8px'}}          
          id="tickets"
          label="Tickets"
          margin="normal"
          onChange = {this.handleChange('tickets')}
        />
        <TextField
        defaultValue = {details.website_link}
          fullWidth        
          style = {{marginLeft: '8px', marginRight: '8px'}}          
          id="website_link"
          label="Website Link"
          margin="normal"
          onChange = {this.handleChange('website_link')}
        />
        {/* <DynamicField addMoreFieldsHandler = {this.addMoreFieldsHandler} firstFieldHandler = {this.firstFieldHandler}/> */}
      </form>
    );
  }
}

EventForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventForm);