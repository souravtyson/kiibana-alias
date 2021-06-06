import React from 'react';
import { Bar } from 'react-chartjs-2';

const colors = ['#004876', '#0063a0', '#007ecc', '#0093ee', '#82caf8', '#c8e6f4'];
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Active',
      backgroundColor: '#a88add',
      stack: '1',
      data: [30, 50, 20, 40, 50, 30, 20, 110],
    },
    {
      label: 'Banned',
      backgroundColor: '#0cc2aa',
      stack: '1',
      data: [10, 0, 5, 15, 0, 4, 8, 8],
    },
    {
      label: 'Opearational',
      backgroundColor: '#0cdda',
      stack: '1',
      data: [17, 0, 3, 15, 0, 4, 8, 8],
    },
    {
      label: 'LCL',
      data: [50, 5, 20, 25],
      backgroundColor: colors[2],
      stack: '1',
    }
  ],
};

const options = {
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        stacked: true,
      },
    ],
    yAxes: [
      {
        stacked: true,
      },
    ],
  },
};


const GroupedBar = () => (
  <>
    <div className='header'>
      <h1 className='title'>Grouped Bar Chart</h1>
      <div className='links'>
        <a
          className='btn btn-gh'
          href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/GroupedBar.js'
        >
          Github Source
        </a>
      </div>
    </div>
    <Bar data={data} options={options} />
  </>
);

export default GroupedBar;