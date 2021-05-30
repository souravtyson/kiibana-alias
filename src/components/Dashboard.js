import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const chartState = {
  labels: [],
  datasets: [
    {
      label: "",
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: []
    }
  ]
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  paper: {
    height: 400,
    width: 700,
  },
  root: {
    textAlign : "center"
  },
  title: {
    fontSize: 14,
  },
  marginTop: {
    marginTop: 120
  }
});

const getFormattedNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Dashboard = ({match:{params:{days}}}) => {
  const classes = useStyles();
  const [numberOfHits, setNumberOfHits] = useState([])
  const [numberOfTraffic, setNumberOfTraffic] = useState([])
  const [barChart, setBarChart] = useState({})
  const [pieChart, setPieChart] = useState({})
  const [tableChart, setTableChart] = useState([])
  
  const refactorDataForPie = (pieData) => {
    const pie = JSON.parse(JSON.stringify(chartState))
    pieData.forEach((x) => {
      pie.labels.push(x.key)
      pie.datasets[0].data.push(x.doc_count)
      pie.datasets[0].label = "IP with count"
    })
    return pie
  }

  const refactorDataForBar = (barData) => {
    const bar = JSON.parse(JSON.stringify(chartState))
    barData.forEach((x) => {
      bar.labels.push(x.key)
      bar.datasets[0].data.push(x.doc_count)
      bar.datasets[0].label = "IP with count"
    })
    return bar
  }

  useEffect(() => {
    fetch(`http://localhost:3001/hits?days=${days}`)
    .then(res => res.json())
    .then((result) => {
      setNumberOfHits(result)
    })
    fetch(`http://localhost:3001/networkTraffic?days=${days}`)
    .then(res => res.json())
    .then((result) => {
      setNumberOfTraffic(result)
    })
    fetch(`http://localhost:3001/table?days=${days}`)
    .then(res => res.json())
    .then((result) => {
      setTableChart(result)
    })
    fetch(`http://localhost:3001/pie?days=${days}`)
    .then(res => res.json())
    .then((result) => {
      setPieChart(refactorDataForPie(result))
    })
    fetch(`http://localhost:3001/bar?days=${days}`)
    .then(res => res.json())
    .then((result) => {
      setBarChart(refactorDataForBar(result))
    })
  },[days])

  return (
    <Grid container spacing={4}>
      {
        numberOfHits.map((hits, index) =>           
          <Grid item xs={12} sm={6}>
            <Card className={`${classes.paper} ${classes.root}`} component={Paper}>
              <CardContent key={index} className={classes.marginTop}>
                <Typography variant="h6" component="h6" >
                  {hits.labels} 
                </Typography>
                <Typography variant="h2" component="h2">
                  { hits.unit === 'Count' ? getFormattedNumber(hits.value) : `${hits.value} ${hits.unit}` }
                </Typography>
              </CardContent>
            </Card>      
          </Grid>
        )
      }
      {
        numberOfTraffic.map((traffic, index) =>           
          <Grid item xs={12} sm={6}>
            <Card className={`${classes.paper} ${classes.root}`} component={Paper}>
              <CardContent key={index} className={classes.marginTop}>
                <Typography variant="h6" component="h6" >
                  {traffic.labels} 
                </Typography>
                <Typography variant="h2" component="h2">
                  { traffic.unit === 'Count' ? getFormattedNumber(traffic.value) : `${traffic.value} ${traffic.unit}` }
                </Typography>
              </CardContent>
            </Card>      
          </Grid>
        )
      }      
      <Grid item sm={6} xs={12}>
        <Paper className={classes.paper} >
          <Pie
            data={pieChart}
            options={{
              title:{
                display:true,
                text:'Average Rainfall per month',
                fontSize:20
              },
              legend:{
                display:true,
                position:'right'
              },
              maintainAspectRatio: false
            }}
          />
        </Paper>
      </Grid>
      <Grid item sm={6} xs={12}>
        <Paper className={classes.paper} >
          <Pie
            data={pieChart}
            options={{
              title:{
                display:true,
                text:'Average Rainfall per month',
                fontSize:20
              },
              legend:{
                display:true,
                position:'right'
              },
              maintainAspectRatio: false
            }}
          />
        </Paper>
      </Grid>      
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper} >
          <Bar
            data={barChart}
            options={{
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20
              },
              legend: {
                display: true,
                position: "right"
              }
            }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Paper className={classes.paper} >
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>IP Address</TableCell>
                <TableCell align="right">Domain Name</TableCell>
                <TableCell align="right">File Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableChart.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">{row.ip_address}</TableCell>
                  <TableCell align="right">{row.domain_name}</TableCell>
                  <TableCell align="right">{row.file_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>       
      </Grid>
      <Grid item xs={12} sm={12}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>IP Address</TableCell>
                <TableCell align="right">Domain Name</TableCell>
                <TableCell align="right">File Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableChart.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">{row.ip_address}</TableCell>
                  <TableCell align="right">{row.domain_name}</TableCell>
                  <TableCell align="right">{row.file_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>          
      </Grid>
    </Grid>
  );
};

export default Dashboard;
