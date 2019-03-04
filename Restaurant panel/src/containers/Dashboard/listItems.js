import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {Link} from 'react-router-dom'


export const mainListItems = (
  <div>
    <Link to = "/dashboard/menu-item">    
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Add Menu Item" />
    </ListItem>
    </Link>
  </div>
);
 