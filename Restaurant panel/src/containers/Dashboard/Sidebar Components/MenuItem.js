import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import {put_request} from "../../../utils/helper";
import {api_base_url} from "../../../config/api-configuration";

class MenuItem extends Component {

    state = {
        name : '',
        price : ''
    }

    itemHandler = (ev) => {
        this.setState({
            item_name : ev.target.value
        })
    }

    costHandler = (ev) => {
        this.setState({
            price : ev.target.value
        })
    }

    submitHandler = (id) => {
        let menu = this.state;
        console.log('submit');
        put_request(api_base_url + "/portal/" + id, menu)
            .then(res => {
                console.log(res);
                alert('added successfully')
            })
    }

  render() {
    return (
      <div>
        <TextField
          id="outlined-email-input"
          label="Add Item Name"
          type="text"
          name="text"
          autoComplete="text"
          margin="normal"
          variant="outlined"
          onChange = {this.itemHandler}
            fullWidth
        />
        <TextField
          id="price"
          label="Add Item Price In Rupees"
          type="number"
          name="email"
          autoComplete="number"
          margin="normal"
          variant="outlined"
          onChange = {this.costHandler}
        />
        <br/>
        <br/>
        <Button variant="contained" color="primary" onClick = {this.submitHandler}>
        Add Menu Item
      </Button>
      </div>
    );
  }
}


export default (MenuItem);
