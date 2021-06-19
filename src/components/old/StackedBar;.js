// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// // import chartjs from 'chart.js';
// // import 'chartjs-plugin-colorschemes';
// // import 'chartjs-plugin-stacked100';
// // import 'chartjs-plugin-datalabels';

// const colors = ['#004876', '#0063a0', '#007ecc', '#0093ee', '#82caf8', '#c8e6f4'];
// const data = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [
//     {
//       label: 'Active',
//       backgroundColor: '#a88add',
//       stack: '1',
//       data: [30, 50, 20, 40, 50, 30, 20, 110],
//     },
//     {
//       label: 'Banned',
//       backgroundColor: '#0cc2aa',
//       stack: '1',
//       data: [10, 0, 5, 15, 0, 4, 8, 8],
//     },
//     {
//       label: 'Opearational',
//       backgroundColor: '#0cdda',
//       stack: '1',
//       data: [17, 0, 3, 15, 0, 4, 8, 8],
//     },
//     {
//       label: 'LCL',
//       data: [50, 5, 20, 25],
//       backgroundColor: colors[2],
//       stack: '1',
//     }
//   ],
// };

// const opts = chartjs.ChartOptions = {
//   scales: {
    
//     xAxes: [{ 
//         stacked: true
//         ,display: false
//         ,categoryPercentage: 1
//         ,barPercentage: 1 
//     }],
//     yAxes: [{
//         display: false
//         ,stacked: true
//         ,categoryPercentage: 1
//         ,barPercentage: 1    
//     }]
//     }
//     ,legend: {
//       labels:{
//         boxWidth: 12
//       }
//     }
//     ,plugins: {
//         colorschemes: {
//             scheme: 'tableau.ClassicMedium10'
//         }
//        /* ,datalabels: {
//           formatter: (value, context) => { console.log(value,context)
//             const data = context.chart.data;
//             const { datasetIndex, dataIndex } = context;
//             return `${data.calculatedData[datasetIndex][dataIndex]}% (${data.originalData[datasetIndex][dataIndex]})`;
//           }
//         }*/
//         ,stacked100: { enable: true, replaceTooltipLabel:false }
//     }
//     ,maintainAspectRatio: false
//     ,tooltips: {
//         mode: 'x', intersect: true, position:'nearest'
//         ,callbacks: {
//           title: () => {return ''}
//     /*      ,label: (tooltipItem, data) => {
//             const datasetIndex = tooltipItem.datasetIndex;
//             const datasetLabel = data.datasets[datasetIndex].label;
//             // You can use two type values.
//             // `data.originalData` is raw values,
//             // `data.calculatedData` is percentage values, e.g. 20.5 (The total value is 100.0)
//             const originalValue = data.originalData[datasetIndex][tooltipItem.index];
//             const rateValue = data.calculatedData[datasetIndex][tooltipItem.index];
//             return `${datasetLabel}: ${rateValue}% (${originalValue}E)`;
//           }*/
//         }
//     }
//   }


// const GroupedBar = () => (
//   <>
//     <div className='header'>
//       <h1 className='title'>Grouped Bar Chart</h1>
//       <div className='links'>
//         <a
//           className='btn btn-gh'
//           href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/GroupedBar.js'
//         >
//           Github Source
//         </a>
//       </div>
//     </div>
//     <Bar data={data} options={opts} />
//   </>
// );

// export default GroupedBar;