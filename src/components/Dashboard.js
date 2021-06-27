import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MetricChart from "components/charts/MetricChart";
import PieChart from "components/charts/PieChart";
import BarChart from "components/charts/BarChart";
import DataTable from "components/charts/DataTable";
import axios from "services/axios";
import request from "services/request";
import colors from "styles/color.js";
import * as util from "utility/utils.js"

const chartState = {
  labels: [],
  datasets: [
    {
      label: "",
      backgroundColor: [],
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [],
    },
  ],
};

const useStyles = makeStyles({
  paper: {
    height: 400
  },
  barFull: {
    height: 400,
    minWidth: "100vh",
  },
  metricPaper: {
    height: 400
  },
  barPaper: {
    height: 400,
  },
  userAccessPaper: {
    height: 400,
  },
});

const Dashboard = ({ match: { params: { days } }}) => {
  const classes = useStyles();
  const [numberOfHits, setNumberOfHits] = useState([]);
  const [numberOfTraffic, setNumberOfTraffic] = useState([]);
  const [barChart, setBarChart] = useState({});
  const [topUserWithConfigAccessBar, setTopUserWithConfigAccessBar] = useState({});
  const [pieChart, setPieChart] = useState({});
  const [secondPieChart, setSecondPieChart] = useState({});
  const [secondTableChart, setSecondTableChart] = useState({ table: [], columns: [] });
  const [numberOfThreatSeverityMetric, setNumberOfThreatSeverityMetric] = useState([]);
  const [barThreatSeverityTypes, setBarThreatSeverityTypes] = useState([]);
  const [uniqueUsersWithConfigAccess, setUniqueUsersWithConfigAccess] = useState([]);
  const [barAdministrativeActivity, setBarAdministrativeActivity] = useState([]);
  const [errorAlertCountDataTable, setErrorAlertCountDataTable] = useState({ table: [], columns: [] });
  const [dataTableRequestCategoryCount, setDataTableRequestCategoryCount] = useState({ table: [], columns: [] });
  const [barSystemAccessByCategory, setBarSystemAccessByCategory] = useState([]);
  const [barPriorityEventsBar, setBarPriorityEventsBar] = useState([]);
  const [numberOfBlockedTrojanCount, setNumberOfBlockedTrojanCount] = useState([]);
  const [dataTableBlockedTrojanDetails, setDataTableBlockedTrojanDetails] = useState({ table: [], columns: [] });
  const [numberOfWebAttackCount, setNumberOfWebAttackCount] = useState([]);
  const [dataTableWebAttackDetails, setDataTableWebAttackDetails] = useState({ table: [], columns: [] });

  const refactorDataForPie = (pieData) => {
    const pie = JSON.parse(JSON.stringify(chartState));
    pieData.forEach((key, index) => {
      key.pie.forEach((dataSet) => {
        pie.labels.push(dataSet.key);
        pie.datasets[index].data.push(dataSet.doc_count);
        pie.datasets[index].backgroundColor.push(util.getRandomColor())
      });
      pie.datasets[index].label = key.labels;
    });
    console.log(pie);
    return pie;
  };

  const getFromToDates = function(){
    var today = new Date();
    today.setDate(today.getDate() - days)
    return today;
  }

  const refactorDataForBar = (barData) => {
    const bar = JSON.parse(JSON.stringify(chartState));
    var dates = util.getDates(getFromToDates(), new Date());                                                                                                    
    const dateStamp = dates;
    bar.labels = [...dateStamp];
    barData.forEach((key) => {
      bar.datasets = key.bar.reduce((acc, data, index) => {
        let index2 = acc.findIndex((x) => x.label === data.key);
        let dateStampIndex = dateStamp.indexOf(data.date);
        if (index2 === -1) {
          let g = {
            label: data.key,
            data: new Array(dateStamp.length).fill(0),
            stack: "1",
            backgroundColor: colors[Math.floor(Math.random() * (colors.length - 1))],
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
          };
          g.data[dateStampIndex] = data.doc_count;
          acc.push(g);
        } else {
          acc[index2].data[dateStampIndex] = data.doc_count;
        }
        return acc;
      }, []);
    });
    return bar;
  };

  const fetchData = async () => {
    const resp = await axios.get(`${request.logInsertionRate}${days}`);
    setNumberOfHits(resp.data);
  };

  const metricUniqueUsersWithConfigAccess = async () => {
    const resp = await axios.get(
      `${request.unique_users_with_config_access}${days}`
    );
    setUniqueUsersWithConfigAccess(resp.data);
  };

  const fetchData2 = async () => {
    const resp = await axios.get(`${request.networkTraffic}${days}`);
    setNumberOfTraffic(resp.data);
  };

  const threatSeverityMetric = async () => {
    const resp = await axios.get(`${request.threatSeverityMetric}${days}`);
    setNumberOfThreatSeverityMetric(resp.data);
  };

  const fetchData3 = async () => {
    const resp = await axios.get(`${request.ips_severity_table_count}${days}`);
    resp.data[0]["columns"] = [
      { field: "key", headerName: "IPS Severity", width: 350 },
      { field: "doc_count", headerName: "Count", width: 120 },
    ];
    resp.data[0].table.forEach((eachRow, index) => (eachRow["id"] = index + 1));
    setSecondTableChart(resp.data[0]);
  };

  const fetchData4 = async () => {
    const resp = await axios.get(`${request.srcip}${days}`);
    setPieChart(refactorDataForPie(resp.data));
  };

  const destinationip = async () => {
    const resp = await axios.get(`${request.destip}${days}`);
    setSecondPieChart(refactorDataForPie(resp.data));
  };

  const fetchData5 = async () => {
    const resp = await axios.get(
      `${request.top_ten_category_by_severity_types}${days}`
    );
    setBarChart(refactorDataForBar(resp.data));
  };

  const topUserWithConfigAccess = async () => {
    const resp = await axios.get(
      `${request.top_user_with_config_access}${days}`
    );
    setTopUserWithConfigAccessBar(refactorDataForBar(resp.data));
  };

  const barChartThreatSeverityTypes = async () => {
    const resp = await axios.get(`${request.threats_by_severity_bar}${days}`);
    setBarThreatSeverityTypes(refactorDataForBar(resp.data));
  };

  const barChartAdministrativeActivity = async () => {
    const resp = await axios.get(`${request.administrative_activity}${days}`);
    setBarAdministrativeActivity(refactorDataForBar(resp.data));
  };

  const dataTableForErrorAlertCount = async () => {
    const resp = await axios.get(`${request.errorAlertCountTable}${days}`);
    resp.data[0]["columns"] = [
      { field: "key", headerName: "Priority", width: 350 },
      { field: "doc_count", headerName: "Count", width: 120 },
    ];
    resp.data[0].table.forEach((eachRow, index) => (eachRow["id"] = index + 1));
    setErrorAlertCountDataTable(resp.data[0]);
  };

  const dataTableRequestCategoryScatterCount = async () => {
    const resp = await axios.get(
      `${request.requestCategoryScatterCountTable}${days}`
    );
    resp.data[0]["columns"] = [
      { field: "key", headerName: "Request Category", width: 400 },
      { field: "doc_count", headerName: "Count", width: 120 },
    ];
    resp.data[0].table.forEach((eachRow, index) => (eachRow["id"] = index + 1));
    setDataTableRequestCategoryCount(resp.data[0]);
  };

  const barChartSystemAccessByCategory = async () => {
    const resp = await axios.get(`${request.system_access_by_category}${days}`);
    setBarSystemAccessByCategory(refactorDataForBar(resp.data));
  };

  const barChartPriorityEventsBar = async () => {
    const resp = await axios.get(`${request.priority_events_bar}${days}`);
    setBarPriorityEventsBar(refactorDataForBar(resp.data));
  };

  const metricNumberOfBlockedTrojanCount = async () => {
    const resp = await axios.get(`${request.blocked_trojan_count}${days}`);
    setNumberOfBlockedTrojanCount(resp.data);
  };

  const blockedTrojanDetails = async () => {
    const resp = await axios.get(
      `${request.blocked_trojan_details_table}${days}`
    );
    resp.data[0]["columns"] = [
      { field: "key", headerName: "Trojan Details", width: 400 },
      { field: "doc_count", headerName: "Count", width: 120 },
    ];
    resp.data[0].table.forEach((eachRow, index) => (eachRow["id"] = index + 1));
    setDataTableBlockedTrojanDetails(resp.data[0]);
  };

  const metricNumberOfWebAttackCount = async () => {
    const resp = await axios.get(`${request.web_attack_count}${days}`);
    setNumberOfWebAttackCount(resp.data);
  };

  const webAttackDetails = async () => {
    const resp = await axios.get(`${request.web_attack_details_table}${days}`);
    resp.data[0]["columns"] = [
      { field: "key", headerName: "TWeb Attack Details", width: 400 },
      { field: "doc_count", headerName: "Count", width: 120 },
    ];
    resp.data[0].table.forEach((eachRow, index) => (eachRow["id"] = index + 1));
    setDataTableWebAttackDetails(resp.data[0]);
  };

  useEffect(() => {
    fetchData();
    fetchData2();
    fetchData3();
    fetchData4();
    fetchData5();
    destinationip();
    threatSeverityMetric();
    topUserWithConfigAccess();
    barChartThreatSeverityTypes();
    metricUniqueUsersWithConfigAccess();
    barChartAdministrativeActivity();
    dataTableForErrorAlertCount();
    dataTableRequestCategoryScatterCount();
    barChartSystemAccessByCategory();
    barChartPriorityEventsBar();
    metricNumberOfBlockedTrojanCount();
    blockedTrojanDetails();
    metricNumberOfWebAttackCount();
    webAttackDetails();
  }, [days]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} id="log_count">
        {numberOfHits.map((hits) => (
          <MetricChart hits={hits} classx={classes.metricPaper} />
        ))}
      </Grid>
      <Grid item xs={12} sm={6} id="nw_traffic">
        {numberOfTraffic.map((traffic) => (
          <MetricChart hits={traffic} classx={classes.metricPaper} />
        ))}
      </Grid>
      <Grid item sm={6} xs={12} id="src_ip">
        <Paper className={classes.paper}>
          <PieChart pieData={pieChart} />
        </Paper>
      </Grid>
      <Grid item sm={6} xs={12} id="dest_ip">
        <Paper className={classes.paper}>
          <PieChart pieData={secondPieChart} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} id="threat_metric" >
        {numberOfThreatSeverityMetric.map((traffic) => (
          <MetricChart hits={traffic} classx={classes.metricPaper} />
        ))}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper} id="threat_table">
          {/* <div>{secondTableChart.labels}</div> */}
          <DataTable
            tableData={secondTableChart.table}
            columns={secondTableChart.columns}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} id="threat_bar">
        <Paper className={classes.barPaper}>
          <BarChart barData={barThreatSeverityTypes} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} id="category_bar">
        <Paper className={classes.barPaper}>
          <BarChart barData={barChart} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={3} id="user_metric">
        {uniqueUsersWithConfigAccess.map((hits) => (
          <MetricChart hits={hits} classx={classes.userAccessPaper} />
        ))}
      </Grid>
      <Grid item xs={12} sm={9} id="user_bar">
        <Paper className={classes.barPaper}>
          <BarChart barData={topUserWithConfigAccessBar} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} id="admin_bar">
        <Paper className={classes.barPaper}>
          <BarChart barData={barAdministrativeActivity} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} id="error_table">
        <Paper className={classes.paper}>
          <DataTable
            tableData={errorAlertCountDataTable.table}
            columns={errorAlertCountDataTable.columns}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} id="req_cat_table">
        <Paper className={classes.paper}>
          <DataTable
            tableData={dataTableRequestCategoryCount.table}
            columns={dataTableRequestCategoryCount.columns}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} id="sys_access_bar">
        <Paper className={classes.barPaper}>
          <BarChart barData={barPriorityEventsBar} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} id="metric_trojan">
        {numberOfBlockedTrojanCount.map((hits) => (
          <MetricChart hits={hits} classx={classes.metricPaper} />
        ))}
      </Grid>
      <Grid item xs={12} sm={6} id="trojan_table">
        <Paper className={classes.paper}>
          <DataTable
            tableData={dataTableBlockedTrojanDetails.table}
            columns={dataTableBlockedTrojanDetails.columns}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} id="metric_web">
        {numberOfWebAttackCount.map((hits) => (
          <MetricChart hits={hits} classx={classes.metricPaper} />
        ))}
      </Grid>
      <Grid item xs={12} sm={6} id="web_table">
        <Paper className={classes.paper}>
          <DataTable
            tableData={dataTableWebAttackDetails.table}
            columns={dataTableWebAttackDetails.columns}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
