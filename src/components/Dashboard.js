import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MetricChart from "components/charts/MetricChart";
import PieChart from "components/charts/PieChart";
import BarChart from "components/charts/BarChart";
import DataTable from "components/charts/DataTable";
import axios from "services/axios";
import request from "services/request";
import colors from "styles/color.js"



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
  paper: {
    height: 400,
    width: 700,
  },
  barFull: {
    height: 400,
    minWidth: "100vh"
  }
});

const Dashboard = ({ match: { params: { days } } }) => {
  const classes = useStyles();
  const [numberOfHits, setNumberOfHits] = useState([])
  const [numberOfTraffic, setNumberOfTraffic] = useState([])
  const [barChart, setBarChart] = useState({})
  const [pieChart, setPieChart] = useState({})
  const [secondPieChart, setSecondPieChart] = useState({})
  const [tableChart, setTableChart] = useState([])
  const [secondTableChart, setSecondTableChart] = useState([])
  const [numberOfThreatSeverityMetric, setNumberOfThreatSeverityMetric] = useState([])

  const refactorDataForPie = (pieData) => {
    const pie = JSON.parse(JSON.stringify(chartState))
    pieData.forEach((key, index) => {
      key.pie.forEach((dataSet) => {
        pie.labels.push(dataSet.key)
        pie.datasets[index].data.push(dataSet.doc_count)
      })
      pie.datasets[index].label = key.label
    })
    return pie
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const refactorDataForBar = (barData) => {
    const bar = JSON.parse(JSON.stringify(chartState))
    const dateStamp = [...new Set(barData[0].bar.map(severity => severity.key_time))]
    bar.labels = [...dateStamp]
    barData.forEach((key) => {
      bar.datasets = key.bar.reduce((acc, data, index) => {
        let index2 = acc.findIndex((x) => x.label === data.key)
        let dateStampIndex = dateStamp.indexOf(data.key_time)
        if (index2 === -1) {
          let g = {
            label: data.key,
            data: new Array(dateStamp.length).fill(0),
            stack: "1",
            backgroundColor: colors[Math.floor(Math.random() * (colors.length-1))],
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
          }
          g.data[dateStampIndex] = data.doc_count
          acc.push(g)
        } else {
          acc[index2].data[dateStampIndex] = data.doc_count
        }
        return acc
      }, [])
    })
    return bar
  }

  const fetchData = async () => {
    const resp = await axios.get(`${request.logInsertionRate}${days}`)
    setNumberOfHits(resp.data)
  }

  const fetchData2 = async () => {
    const resp = await axios.get(`${request.networkTraffic}${days}`)
    setNumberOfTraffic(resp.data)
  }


  const threatSeverityMetric = async () => {
    const resp = await axios.get(`${request.threatSeverityMetric}${days}`)
    setNumberOfThreatSeverityMetric(resp.data)
  }

  const fetchData3 = async () => {
    const resp = await axios.get(`${request.table}${days}`)
    setTableChart(resp.data)
    setSecondTableChart(resp.data)
  }

  const fetchData4 = async () => {
    const resp = await axios.get(`${request.srcip}${days}`)
    setPieChart(refactorDataForPie(resp.data))
  }

  const destinationip = async () => {
    const resp = await axios.get(`${request.destip}${days}`)
    setSecondPieChart(refactorDataForPie(resp.data))
  }

  const fetchData5 = async () => {
    const resp = await axios.get(`${request.top_ten_category_by_severity_types}${days}`)
    setBarChart(refactorDataForBar(resp.data))
  }

  useEffect(() => {
    fetchData()
    fetchData2()
    fetchData3()
    fetchData4()
    fetchData5()
    destinationip()
    threatSeverityMetric()
  }, [days])

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        {
          numberOfHits.map((hits) =>
            <MetricChart hits={hits} />
          )
        }
      </Grid>
      <Grid item xs={12} sm={6}>
        {
          numberOfTraffic.map((traffic) =>
            <MetricChart hits={traffic} />
          )
        }
      </Grid>
      <Grid item sm={6} xs={12}>
        <Paper className={classes.paper} >
          <PieChart pieData={pieChart} />
        </Paper>
      </Grid>
      <Grid item sm={6} xs={12}>
        <Paper className={classes.paper} >
          <PieChart pieData={secondPieChart} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        {
          numberOfThreatSeverityMetric.map((traffic) =>
            <MetricChart hits={traffic} />
          )
        }
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper} >
          <DataTable tableData={secondTableChart} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Paper >
          <BarChart barData={barChart} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Paper >
          <BarChart barData={barChart} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Paper >
          <BarChart barData={barChart} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Paper >
          <BarChart barData={barChart} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <DataTable tableData={tableChart} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        {
          numberOfHits.map((hits) =>
            <MetricChart hits={hits} />
          )
        }
      </Grid>
    </Grid>
  );
};

export default Dashboard;
