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
    width: 145,
    textAlign : "center",
    height: 95
  },
  title: {
    fontSize: 14,
  }
});

function createData(name, calories, fat, carbs, protein, ip) {
  return { name, calories, fat, carbs, protein, ip }; 
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, "192.168.13.123"),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, "192.168.13.145"),
  createData('Eclair', 262, 16.0, 24, 6.0, "192.168.13.127"),
  createData('Cupcake', 305, 3.7, 67, 4.3, "192.168.13.152"),
  createData('Gingerbread', 356, 16.0, 49, 3.9, "192.168.13.102"),
];

const SevenDayDashboard = ({match:{params:{days}}}) => {
  const classes = useStyles();
  const [numberOfHits, setNumberOfHits] = useState([])
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
  },[])

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        <Card className={classes.root} component={Paper}>
          {
            numberOfHits.map((hits) =>           
            <CardContent >
              <Typography className={classes.title} >
               Hits 
              </Typography>
              <Typography variant="h5" component="h2">
                {hits.ip}
              </Typography>
            </CardContent>
          )
          }
        </Card>      
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

export default SevenDayDashboard;
