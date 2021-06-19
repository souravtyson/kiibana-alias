import React from 'react';
import { Pie } from "react-chartjs-2";


export default class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideOpen: false,
        }

        this.handleClick = this.handleClick.bind(this);
        this.update = this.update.bind(this);
        this.doParentToggle = this.doParentToggle.bind(this);
    }

    doParentToggle() {


        this.setState({
            
        })
        this.update();
    }

    handleClick() {
        this.setState({
            slideOpen: !this.state.slideOpen
        })
    }

    update() {
        var piData;
        this.setState({
            
        })
    }

    componentDidMount() {
        // let ctx = this.refs.chart.chart_instance.chart.ctx;
        // console.log(this.refs.chart.chart_instance.chart.ctx); // returns a Chart.js instance reference
        // this.refs.chart.chart_instance.chart.config.data.datasets.forEach(function (dataset) {
        //     if (dataset.type === 'bar') {
        //         const dataArray = dataset.data;
        //         dataset._meta[0].data.forEach(function (bar, index) {
        //             ctx.fillText(dataArray[index], bar._view.x, bar._view.y);
        //         });
        //     };
        // })
    }

    render() {


        const CategoriesPanel = this.state.slideOpen ? "slideOpen" : "";
        const { length } = this.props

        const data = {
            datasets: [{
                data:  [
                    {
                      "key": "ICMP Echo Reply",
                      "doc_count": 167,
                      "severity": "Low"
                    },
                    {
                      "key": "ICMP PING *NIX",
                      "doc_count": 35,
                      "severity": "Low"
                    },
                    {
                      "key": "ICMP PING",
                      "doc_count": 35,
                      "severity": "Low"
                    }
                  ],
                backgroundColor: [
                    'orange',
                    'blue',
                    'red',
                    'purple',
                    'green'
                ],
                borderColor: [
                    'orange',
                    'blue',
                    'red',
                    'purple',
                    'green'
                ]
            }]
        };

        var pieOptions = {
            pieceLabel: {
                render: function (args) {
                    return args.value + '%';
                },
                fontSize: 40,
                fontColor: '#fff'
            }
        };

        const bardata = {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [
                {
                    backgroundColor: [
                        'orange',
                        'blue',
                        'red',
                        'purple',
                        'green'
                    ],
                    borderColor: 'black',
                    borderWidth: 3,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [{"label":"ICMP Echo Reply","data":[411,100,316],"stack":"1","backgroundColor":"#82caf8","borderColor":"rgba(0,0,0,1)","borderWidth":2},{"label":"INFO SSLv2.0 Client Hello","data":[27,0,0],"stack":"1","backgroundColor":"#c8e6f4","borderColor":"rgba(0,0,0,1)","borderWidth":2},{"label":"INFO SSLv2.0 Client Hello 2","data":[27,0,0],"stack":"1","backgroundColor":"rgba(54, 162, 235, 0.2)","borderColor":"rgba(0,0,0,1)","borderWidth":2},{"label":"ICMP PING","data":[0,31,0],"stack":"1","backgroundColor":"#6D7D7B","borderColor":"rgba(0,0,0,1)","borderWidth":2},{"label":"ICMP PING *NIX","data":[0,31,0],"stack":"1","backgroundColor":"#78A6A4","borderColor":"rgba(0,0,0,1)","borderWidth":2},{"label":"ICMP PING Microsoft Windows 2","data":[0,0,278],"stack":"1","backgroundColor":"#0093ee","borderColor":"rgba(0,0,0,1)","borderWidth":2},{"label":"ICMP PING L3retriever","data":[0,0,277],"stack":"1","backgroundColor":"#0093ee","borderColor":"rgba(0,0,0,1)","borderWidth":2}]
                }
            ]
        };

        return (
            <div>
                <div id="chart" className={CategoriesPanel}>
                    <div style={{ "display": "flex" }}>
                        <Pie style={{ "fontSize": "20px" }} data={data} options={pieOptions} />
                        {/* <HorizontalBar
                            ref='chart'
                            data={bardata}
                            width={100}
                            height={50}
                            options={{
                                maintainAspectRatio: false
                            }}
                        /> */}
                    </div>
                </div>
                
            </div>
        )
    }
}