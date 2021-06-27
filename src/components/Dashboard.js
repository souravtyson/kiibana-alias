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
import * as util from "utility/utils.js";
import NoData from "./views/NoData";

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
    height: 400,
  },
  barFull: {
    height: 400,
    minWidth: "100vh",
  },
  metricPaper: {
    height: 400,
  },
  barPaper: {
    height: 400,
  },
  userAccessPaper: {
    height: 400,
  },
});

const Dashboard = ({match: {params: { days },},}) => {
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
        pie.datasets[index].backgroundColor.push(util.getRandomColor());
      });
      pie.datasets[index].label = key.labels;
    });
    console.log(pie);
    return pie;
  };

  const getFromToDates = function () {
    var today = new Date();
    today.setDate(today.getDate() - days);
    return today;
  };

  const refactorDataForBar = (barData) => {
    if(barData.length > 0) {
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
    }
    return []
  };

  const fetchData = async () => {
    await axios
      .get(`${request.logInsertionRate}${days}`)
      .then((resp) => {
        setNumberOfHits(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const metricUniqueUsersWithConfigAccess = async () => {
    await axios
      .get(`${request.unique_users_with_config_access}${days}`)
      .then((resp) => {
        setUniqueUsersWithConfigAccess(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchData2 = async () => {
    await axios
    .get(`${request.networkTraffic}${days}`)
    .then(resp => {
      setNumberOfTraffic(resp.data);
    }).catch(error => {
      setNumberOfTraffic([]);
    });
  };

  const threatSeverityMetric = async () => {
    await axios
    .get(`${request.threatSeverityMetric}${days}`)
    .then(resp => {
      setNumberOfThreatSeverityMetric(resp.data);
    }).catch(error => {
      setNumberOfThreatSeverityMetric([]);
    });
  };

  const fetchData3 = async () => {
    await axios
    .get(`${request.ips_severity_table_count}${days}`)
    .then(resp => {
      resp.data[0]["columns"] = [
        { field: "key", headerName: "IPS Severity", width: 350 },
        { field: "doc_count", headerName: "Count", width: 120 },
      ];
      resp.data[0].table.forEach((eachRow, index) => (eachRow["id"] = index + 1));
      setSecondTableChart(resp.data[0]);
    }).catch(error => {
      setSecondTableChart([]);
    });
  };

  const fetchData4 = async () => {
    await axios
    .get(`${request.srcip}${days}`)
    .then(resp => {
      setPieChart(refactorDataForPie(resp.data));
    })
    .catch(error => {
      setPieChart([]);
    });
  };

  const destinationip = async () => {
    await axios
    .get(`${request.destip}${days}`)
    .then(resp => {
      setSecondPieChart(refactorDataForPie(resp.data));
    }).catch(error => {
      setSecondPieChart([]);
    });
  };

  const fetchData5 = async () => {
    await axios
    .get(`${request.top_ten_category_by_severity_types}${days}`)
    .then(resp => {
      setBarChart(refactorDataForBar(resp.data));
    }).catch(error => {
      setBarChart([]);
    });
  };

  const topUserWithConfigAccess = async () => {
    await axios.get(`${request.top_user_with_config_access}${days}`).then(resp => {
      setTopUserWithConfigAccessBar(refactorDataForBar(resp.data));
    }).catch(error => {
      setTopUserWithConfigAccessBar([]);
    });
  };

  const barChartThreatSeverityTypes = async () => {
    await axios.get(`${request.threats_by_severity_bar}${days}`).then(resp => {
      setBarThreatSeverityTypes(refactorDataForBar(resp.data));
    }).catch(error => {
      setBarThreatSeverityTypes([]);
    });
  };

  const barChartAdministrativeActivity = async () => {
    await axios.get(`${request.administrative_activity}${days}`).then(resp => {
      setBarAdministrativeActivity(refactorDataForBar(resp.data));
    }).catch(error => {
      setBarAdministrativeActivity([]);
    });
  };

  const dataTableForErrorAlertCount = async () => {
    await axios.get(`${request.errorAlertCountTable}${days}`).then(resp => {
      resp.data[0]["columns"] = [
        { field: "key", headerName: "Priority", width: 350 },
        { field: "doc_count", headerName: "Count", width: 120 },
      ];
      resp.data[0].table.forEach((eachRow, index) => (eachRow["id"] = index + 1));
      setErrorAlertCountDataTable(resp.data[0]);
    }).catch(error => {
      setErrorAlertCountDataTable([])
    });
  };

  const dataTableRequestCategoryScatterCount = async () => {
    await axios.get(`${request.requestCategoryScatterCountTable}${days}`).then(resp => {
      resp.data[0]["columns"] = [
        { field: "key", headerName: "Request Category", width: 400 },
        { field: "doc_count", headerName: "Count", width: 120 },
      ];
      resp.data[0].table.forEach((eachRow, index) => (eachRow["id"] = index + 1));
      setDataTableRequestCategoryCount(resp.data[0]);
    }).catch(error => {
      setDataTableRequestCategoryCount([])
    });
  };

  const barChartSystemAccessByCategory = async () => {
    await axios.get(`${request.system_access_by_category}${days}`).then(resp => {
      setBarSystemAccessByCategory(refactorDataForBar(resp.data));
    }).catch(error => {
      setBarSystemAccessByCategory([])
    });
  };

  const barChartPriorityEventsBar = async () => {
    await axios.get(`${request.priority_events_bar}${days}`).then(resp => {
      setBarPriorityEventsBar(refactorDataForBar(resp.data));
    }).catch(error => {
      setBarPriorityEventsBar([])
    })
  };

  const metricNumberOfBlockedTrojanCount = async () => {
    await axios.get(`${request.blocked_trojan_count}${days}`)
      .then((resp) => {
        setNumberOfBlockedTrojanCount(resp.data);
      })
      .catch((error) => {
        setNumberOfBlockedTrojanCount([]);
      });
  };

  const blockedTrojanDetails = async () => {
    await axios.get(`${request.blocked_trojan_details_table}${days}`).then(resp => {
      resp.data[0]["columns"] = [
        { field: "key", headerName: "Trojan Details", width: 400 },
        { field: "doc_count", headerName: "Count", width: 120 },
      ];
      resp.data[0].table.forEach((eachRow, index) => (eachRow["id"] = index + 1));
      setDataTableBlockedTrojanDetails(resp.data[0]);
    }).catch(error => {
      setDataTableBlockedTrojanDetails([])
    });
  };

  const metricNumberOfWebAttackCount = async () => {
    await axios
      .get(`${request.web_attack_count}${days}`)
      .then((resp) => {
        setNumberOfWebAttackCount(resp.data);
      })
      .catch((error) => {
        setNumberOfWebAttackCount([]);
      });
  };

  const webAttackDetails = async () => {
    await axios.get(`${request.web_attack_details_table}${days}`).then(resp => {
      resp.data[0]["columns"] = [
        { field: "key", headerName: "TWeb Attack Details", width: 400 },
        { field: "doc_count", headerName: "Count", width: 120 },
      ];
      resp.data[0].table.forEach((eachRow, index) => (eachRow["id"] = index + 1));
      setDataTableWebAttackDetails(resp.data[0]);
    }).catch(error => {
      setDataTableWebAttackDetails([])
    });
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
      <Grid item xs={12} sm={6} id="threat_metric">
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
      <Grid item xs={12} sm={12} id="sys_access_by_category">
        <Paper className={classes.barPaper}>
          {
            barSystemAccessByCategory.length > 0 ? 
            ( <BarChart barData={barSystemAccessByCategory} />) :
            (<NoData />)
          }
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} id="sys_access_bar">
        <Paper className={classes.barPaper}>
          {
            barPriorityEventsBar.length > 0 ? 
            ( <BarChart barData={barPriorityEventsBar} />) :
            (<NoData />)
          }
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} id="metric_trojan">
        {numberOfBlockedTrojanCount.length > 0 ? (
          numberOfBlockedTrojanCount.map((hits) => (
            <MetricChart hits={hits} classx={classes.metricPaper} />
          ))
        ) : (
          <Paper className={classes.paper}>
            <NoData />
          </Paper>
        )}
      </Grid>
      <Grid item xs={12} sm={6} id="trojan_table">
        <Paper className={classes.paper}>
          { dataTableBlockedTrojanDetails.length > 0 ? (<DataTable
            tableData={dataTableBlockedTrojanDetails.table}
            columns={dataTableBlockedTrojanDetails.columns}
          />) : 
            (<NoData />)
          }
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} id="metric_web">
        {numberOfWebAttackCount.length > 0 ? (
          numberOfWebAttackCount.map((hits) => (
            <MetricChart hits={hits} classx={classes.metricPaper} />
          ))
        ) : (
          <Paper className={classes.paper}>
            <NoData />
          </Paper>
        )}
      </Grid>
      <Grid item xs={12} sm={6} id="web_table">
        <Paper className={classes.paper}>
          {
            dataTableWebAttackDetails.length > 0 ? (<DataTable
              tableData={dataTableWebAttackDetails.table}
              columns={dataTableWebAttackDetails.columns}
            />) :
              (<NoData />)
          }

        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
