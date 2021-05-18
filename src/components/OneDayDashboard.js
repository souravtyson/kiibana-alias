import { Grid } from "@material-ui/core";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
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

const state = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Rainfall",
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
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

const OneDayDashboard = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        <Card className={classes.root} component={Paper}>
          <CardContent >
          <Typography className={classes.title} >
           Hits 
          </Typography>
          <Typography variant="h5" component="h2">
            20
          </Typography>
            </CardContent>
        </Card>      
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper} >
          <Bar
            data={state}
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
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                <TableCell align="right">IP</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                  <TableCell align="right">{row.ip}</TableCell>
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
            data={state}
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
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                <TableCell align="right">IP</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                  <TableCell align="right">{row.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>          
      </Grid>
    </Grid>
  );
};

export default OneDayDashboard;
