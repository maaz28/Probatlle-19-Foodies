import React, { Component } from 'react';
import { connect } from 'react-redux';
import NativeSelects from '../../components/shared/Select'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class EventSearch extends Component {

	state = {
		when : '',
		where : '',
		what : ''
	}
	
	selectHandler = (name, value) => {
		this.setState({ [name]: value });
	}
	
  render() { 


    return (
		<div class="content-box">
		<div class="wrap">
		<Grid container spacing={24}>
		<Grid item xs={3}>
			<NativeSelects 
			title = "When?" 
			items={["today", "This Week", "This Month"]} 
			name = "when"
			selectHandler = {this.selectHandler}
			/>
		</Grid>
		<Grid item xs={3}>
			<NativeSelects 
			title = "Where?" 
			items={["Victoria City", "Sha Tin", "Discovery Bay", "Kowloon "]} 
			name = "where"
			/>
		</Grid>
		<Grid item xs={3}>
			<NativeSelects 
			title = "What?" 
			items={["Concert", "Film", "Education", "Meetup"]} 
			name = "what"
			/>
		</Grid>
		<Grid item xs={3}>
		<Button variant="contained" color="secondary" style = {{marginTop : '19px', marginLeft : '8px'}}>
        Whats Happening?
      </Button>
		</Grid>
		</Grid>
		</div>
	</div>
    );
  }
}

// function mapDispatchToProp(dispatch) {
// 	return ({
// 		SingleProductDetails : (data) => {
// 			dispatch(SingleProductDetails(data));
// 		}
// 	})
// }

function mapStateToProp(state) {
	console.log(state)
	return ({
		// single_product : state.single_product_details.single_product
	})
}



export default connect(mapStateToProp, null)(EventSearch);
