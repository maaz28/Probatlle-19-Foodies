import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {Link} from 'react-router-dom'


export const mainListItems = (
  <div>
    <Link to = "/dashboard/list">    
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Restaurants List" />
    </ListItem>
    </Link>
    <Link to = "/dashboard/request">
    <ListItem button> 
      <ListItemIcon>
        <ShoppingCartIcon/> 
      </ListItemIcon>
      <ListItemText primary="Requests" />
    </ListItem>
    </Link>
  </div>
);
