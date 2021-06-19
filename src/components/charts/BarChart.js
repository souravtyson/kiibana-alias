import React from 'react';
import { Bar } from "react-chartjs-2";

function BarChart({ barData, id }) {
    return (
        <Bar id={id}
            data={barData}
            options={{
              responsive:true,
              maintainAspectRatio: false,
              title: {
                  display: false,
                  text: "",
                  fontSize: 20
              },
              legend: {
                  display: true,
                  position: "right"
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
              }
            }}
        />
    );
}

export default BarChart;