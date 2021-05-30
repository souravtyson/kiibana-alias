import React, { useState } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Dashboard from './Dashboard';

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
  const sideBarOption = [{label: '7 Days', path: "seven", days: 7}, {label: '30 Days', path: 'thirty', days: 30}]
  const [defaultPath] = useState(7)
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
                <ListItem component={Link} to={`/${text.days}`} button key={text.label}>
                  <ListItemText primary={text.label} />
                </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
          <Toolbar />
          <Switch>
              <Route
                exact
                path="/"
                render={() => {
                    return (
                      <Redirect to={`/${defaultPath}`} /> 
                    )
                }}
              />
            <Route path="/:days" component={Dashboard}/>
          </Switch>
      </main>
    </div>
  );
}
