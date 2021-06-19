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
    width: 755,
  },
  barFull: {
    height: 400,
    minWidth: "100vh"
  },
  metricPaper: {
    height: 400,
    width: 755,
  },
  barPaper: {
    height: 400
  }, 
  userAccessPaper: {
    height: 400,
    
  }
});

const Dashboard = ({ match: { params: { days } } }) => {
  const classes = useStyles();
  const [numberOfHits, setNumberOfHits] = useState([])
  const [numberOfTraffic, setNumberOfTraffic] = useState([])
  const [barChart, setBarChart] = useState({})
  const [topUserWithConfigAccessBar, setTopUserWithConfigAccessBar] = useState({})
  const [pieChart, setPieChart] = useState({})
  const [secondPieChart, setSecondPieChart] = useState({})
  const [secondTableChart, setSecondTableChart] = useState({table: [], columns: []})
  const [numberOfThreatSeverityMetric, setNumberOfThreatSeverityMetric] = useState([])
  const [barThreatSeverityTypes, setBarThreatSeverityTypes] = useState([])
  const [uniqueUsersWithConfigAccess, setUniqueUsersWithConfigAccess] = useState([])
  const [barAdministrativeActivity, setBarAdministrativeActivity] = useState([])
  const [errorAlertCountDataTable, setErrorAlertCountDataTable] = useState({table: [], columns: []})
  const [dataTableRequestCategoryCount, setDataTableRequestCategoryCount] = useState({table: [], columns: []})
  
  
  

  const refactorDataForPie = (pieData) => {
    const pie = JSON.parse(JSON.stringify(chartState))
    pieData.forEach((key, index) => {
      key.pie.forEach((dataSet) => {
        pie.labels.push(dataSet.key)
        pie.datasets[index].data.push(dataSet.doc_count)
      })
      pie.datasets[index].label = key.labels
    })
    console.log(pie)
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
    const dateStamp = [...new Set(barData[0].bar.map(severity => severity.date))]
    bar.labels = [...dateStamp]
    barData.forEach((key) => {
      bar.datasets = key.bar.reduce((acc, data, index) => {
        let index2 = acc.findIndex((x) => x.label === data.key)
        let dateStampIndex = dateStamp.indexOf(data.date)
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
  
  const metricUniqueUsersWithConfigAccess = async () => {
    const resp = await axios.get(`${request.unique_users_with_config_access}${days}`)
    setUniqueUsersWithConfigAccess(resp.data)
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
    const resp = await axios.get(`${request.ips_severity_table_count}${days}`)
    resp.data[0]['columns'] = [
      {field: "key", headerName: "IPS Severity", width: 350},
      {field: "doc_count", headerName: "Count", width: 120}
    ]    
    resp.data[0].table.forEach((eachRow, index) => eachRow['id'] = index + 1)
    setSecondTableChart(resp.data[0])
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
  
  const topUserWithConfigAccess = async () => {
    const resp = await axios.get(`${request.top_user_with_config_access}${days}`)
    setTopUserWithConfigAccessBar(refactorDataForBar(resp.data))
  }
  
  const barChartThreatSeverityTypes = async () => {
    const resp = await axios.get(`${request.threats_by_severity_bar}${days}`)
    setBarThreatSeverityTypes(refactorDataForBar(resp.data))
  }
  
  const barChartAdministrativeActivity = async () => {
    const resp = await axios.get(`${request.administrative_activity}${days}`)
    setBarAdministrativeActivity(refactorDataForBar(resp.data))
  }
   
  const dataTableForErrorAlertCount = async () => {
    const resp = await axios.get(`${request.errorAlertCountTable}${days}`)
    resp.data[0]['columns'] = [
      {field: "key", headerName: "Priority", width: 350},
      {field: "doc_count", headerName: "Count", width: 120}
    ]
    resp.data[0].table.forEach((eachRow, index) => eachRow['id'] = index + 1)
    setErrorAlertCountDataTable(resp.data[0])
  }

  const dataTableRequestCategoryScatterCount = async () => {
    const resp = await axios.get(`${request.requestCategoryScatterCountTable}${days}`)
    resp.data[0]['columns'] = [
      {field: "key", headerName: "Request Category", width: 400},
      {field: "doc_count", headerName: "Count", width: 120}
    ]
    resp.data[0].table.forEach((eachRow, index) => eachRow['id'] = index + 1)
    setDataTableRequestCategoryCount(resp.data[0])
  }

  useEffect(() => {
    fetchData()
    fetchData2()
    fetchData3()
    fetchData4()
    fetchData5()
    destinationip()
    threatSeverityMetric()
	  topUserWithConfigAccess()
	  barChartThreatSeverityTypes()
	  metricUniqueUsersWithConfigAccess()
	  barChartAdministrativeActivity()
    dataTableForErrorAlertCount()
    dataTableRequestCategoryScatterCount()
  }, [days])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} id="metricnumberofhits">
        {
          numberOfHits.map((hits) =>
            <MetricChart hits={hits} classx={classes.metricPaper}/>
          )
        }
      </Grid>
      <Grid item xs={12} sm={6} id="metrictraffic">
        {
          numberOfTraffic.map((traffic) =>
            <MetricChart hits={traffic} classx={classes.metricPaper}/>
          )
        }
      </Grid>
      <Grid item sm={6} xs={12} id="piecheck">
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
            <MetricChart hits={traffic} classx={classes.metricPaper}/>
          )
        }
      </Grid>
      <Grid item xs={12} sm={6} >
        <Paper className={classes.paper} id="datatablecheck">
          {/* <div>{secondTableChart.labels}</div> */}
          <DataTable tableData={secondTableChart.table} columns={secondTableChart.columns}/>
        </Paper>
      </Grid>
	   <Grid item xs={12} sm={12} id="barcheck">
        <Paper className={classes.barPaper}>
          <BarChart barData={barThreatSeverityTypes} id="firstBar"/>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} id="barchart2">
        <Paper className={classes.barPaper}>
          <BarChart barData={barChart} id="secondbar"/>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={3}>
        {
          uniqueUsersWithConfigAccess.map((hits) =>
            <MetricChart hits={hits} classx={classes.userAccessPaper}/>
          )
        }
      </Grid>
      <Grid item xs={12} sm={9}>
        <Paper className={classes.barPaper}>
          <BarChart barData={topUserWithConfigAccessBar} id="thirdbar"/>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Paper className={classes.barPaper}>
          <BarChart barData={barAdministrativeActivity} id="fourthbar"/>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <DataTable tableData={errorAlertCountDataTable.table} columns={errorAlertCountDataTable.columns}/>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} id="tablerequestcategorycount">
        <Paper className={classes.paper}>
          <DataTable tableData={dataTableRequestCategoryCount.table} columns={dataTableRequestCategoryCount.columns}/>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Paper className={classes.barPaper}>
          <BarChart barData="" id="fifthbar"/>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
