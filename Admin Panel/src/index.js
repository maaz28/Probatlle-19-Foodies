import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './config/routes'
// import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import {Provider} from 'react-redux';
import './css/style.css'; 
import store from './redux/store'; 
import './containers/responsive.js'

const THEME = createMuiTheme({
    typography: {
        fontSize: '14px',
    }
 });  

ReactDOM.render( 
    <Provider store={store}> <MuiThemeProvider theme={THEME}> <Routing /> </MuiThemeProvider> </Provider>  , document.getElementById('root'));

