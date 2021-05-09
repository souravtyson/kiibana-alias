import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import OneDayDashboard from './OneDayDashboard'
import SevenDayDashboard from './SevenDayDashboard';
import ThirtyDayDashboard from './ThirtyDayDashboard';
import OneYearDashboard from './OneYearDashboard';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
}));

export default function SideBar() {
  const classes = useStyles();
  const sideBarOption = [{label : '1 Day', path: "/"}, {label: '7 Days', path: "seven"}, {label: '30 Days', path: 'thirty'}, {label: '1 Year', path: 'year'}]
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {sideBarOption.map((text) => (
                <ListItem component={Link} to={text.path} button key={text.label}>
                  <ListItemText primary={text.label} />
                </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
          <Toolbar />
          <Switch>
            <Route path="/" component={OneDayDashboard} exact />
            <Route path="/seven" component={SevenDayDashboard} />
            <Route path="/thirty" component={ThirtyDayDashboard} />
            <Route path="/year" component={OneYearDashboard} />
          </Switch>
      </main>
    </div>
  );
}
