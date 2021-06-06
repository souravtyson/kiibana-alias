import React from 'react';
import { Bar } from "react-chartjs-2";

function BarChart({ barData }) {
    return (
        <Bar
            data={barData}
            options={{
                title: {
                    display: true,
                    text: "Average Rainfall per month",
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