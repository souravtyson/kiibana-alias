import { Grid } from "@material-ui/core";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

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

const OneYearDashboard = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6}>
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
      </Grid>
      <Grid item xs={12} sm={6}>
        <Line
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
      </Grid>
    </Grid>
  );
};

export default OneYearDashboard;
