import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import EditEventForm from './EditEventForm';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width : '600px',
    margin : 'auto'
  },
})


class EditEventContainer extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div class="main">
      <div class="wrap">
      	<div class="section group">
      <Paper className={classes.root} elevation={10}>
      <div style = {{margin : '8px'}}>
      <Typography variant="h5" component="h3">
      Add New Event
      </Typography>
      </div>
      <EditEventForm/>
      </Paper>
  </div> 
  </div>
      </div>
    );
  }
}

EditEventContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProp(state) {
  return ({
    edit : state.event_reducer.edit
  })
}

export default connect(mapStateToProp, null)(withStyles(styles)(EditEventContainer));
