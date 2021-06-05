import React from 'react';
import { Pie } from "react-chartjs-2";

function PieChart({ pieData }) {
    return (
        <Pie
            data={pieData}
            options={{
                title: {
                    display: true,
                    text: 'Average Rainfall per month',
                    fontSize: 20
                },
                legend: {
                    display: true,
                    position: 'right'
                },
                maintainAspectRatio: false
            }}
        />
    );
}

export default PieChart;