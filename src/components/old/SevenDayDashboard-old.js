import { Grid } from "@material-ui/core";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const state = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Rainfall",
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
};

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 400,
    width: 700,
  },
}));

const SevenDayDashboard_old = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={4}>
      <Grid item sm={6} xs={12} >
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
      <Grid item xs={12}>
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
    </Grid>
  );
};

export default SevenDayDashboard_old;
