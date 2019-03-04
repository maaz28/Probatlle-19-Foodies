import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Icon } from '@material-ui/core';

export default class ContributionContainer extends Component {
    
    state = {
        tokens : ''
    }

    textFieldHandler = (ev) => {
        this.setState({
            tokens : ev.target.value
        })
    }

    btnClickHandler = () => {
        console.log(this.state)
    }

    render(){
        return(
            <div>
            <p className = "para-spacing">
            On this screen, you can purchase SPACE tokens with ETH in Ropsten testnet. Use the calculator below to evaluate sum for the desired amount of tokens.
          </p>
          <p className = "para-spacing">
Just input the amount of ETH you want to contribute and find out the number of SPACE tokens you will get. Please note that a little ETH adding on top to cover the gas fee.
          </p>
          <div className = "text-field">
          <TextField
          onChange = {this.textFieldHandler}
          fullWidth
          id="outlined-text-input"
          label="ex: 10.014584"
          helperText = "Enter the value in ethers(ETH)"
          type="text"
          name="text"
          autoComplete="text"
          margin="normal"
          variant="outlined"
        />
              <Button variant="contained" color="primary" style = {{margin : '16px 0px', padding : '9px'}} onClick = {this.btnClickHandler}>
        Confirm Contribution
        <Icon style = {{marginLeft : '16px'}}>forward</Icon>
      </Button>
          </div>
            </div>
        )
    }
}