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
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

import Dashboard from './Dashboard';

const drawerWidth = 140;

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
  const [htmlAsImageList, setHtmlAsImageList] = useState([])
  const [divId, setDivId] = useState(['metricnumberofhits','metrictraffic','piecheck','datatablecheck','barcheck','barchart2','tablerequestcategorycount'])

  const convertHTMLToCanvas = () => {
    const x = []
    divId.forEach((id) => {
      let element = document.getElementById(id)
      if(element){
        html2canvas(element, {
          logging: false
        }).then((canvas) => {
          console.log(canvas)
          let contentWidth = canvas.width;
          let contentHeight = canvas.height;
          let imgWidth = 595.28;
          let imgHeight = 592.28 / contentWidth * contentHeight;
          var imgData = canvas.toDataURL('image/jpeg', 1.0);
          let dataObj = {
            imgWidth: imgWidth,
            imgHeight: imgHeight,
            imgData: imgData
          }
          x.push(dataObj)
        }).then(() => {
          setHtmlAsImageList(x);
          if(x.length === 7){
            generatePDF()
          }
        })
      }else{
        console.log('empty')
        console.log(element)
        console.log(id)
      }
    })
  }

  const generatePDF = () => {
    const pdf = new jsPDF('', 'pt', 'a4');
    htmlAsImageList.forEach(({imgData, imgWidth, imgHeight},index) => {
      if(index !== 0){
        pdf.addPage()
      }
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
    })
    pdf.save("download.pdf");  
  }

  const downLoadGraph = () => {
    console.log('hello')
    html2canvas(document.getElementById("barcheck"), { 
      letterRendering: 1,
      allowTaint : true,
      useCORS: true,
      logging: true,
    }).then(canvas => {
      console.log(canvas)
      let contentWidth = canvas.width;
      let contentHeight = canvas.height;
      let imgWidth = 595.28;
      let imgHeight = 592.28 / contentWidth * contentHeight;
      canvas.getContext('2d');
      var imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('', 'pt', 'a4');
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      pdf.save("download.pdf");  
      // const a = document.createElement("a");
      // a.href = canvas.toDataURL('image/png');
      // a.download = 'Canvas.png';
      // a.click();
    });
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
          <button onClick={convertHTMLToCanvas}>Download Canvas</button>
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
