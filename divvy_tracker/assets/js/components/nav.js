import React from 'react';
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import StorageIcon from '@material-ui/icons/Storage';

function ListItemLink(props) {
  return <ListItem button component={Link} {...props} />;
}

export const mainNav = (
  <div>
    <ListItemLink to="/">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemLink>
    <ListItemLink to="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemLink>
    <ListItemLink to="/users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemLink>
    <ListItemLink to="/reports">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemLink>
  </div>
);

export const footerNav = (
  <div>
    <ListItemLink to="/upload">
      <ListItemIcon>
        <CloudUploadIcon />
      </ListItemIcon>
      <ListItemText primary="Upload" />
    </ListItemLink>
    <ListItem button component="a" href="/api/transactions" target="blank">
      <ListItemIcon>
        <StorageIcon />
      </ListItemIcon>
      <ListItemText primary="Transactions" secondary="Data Interface" />
    </ListItem>
  </div>
);
