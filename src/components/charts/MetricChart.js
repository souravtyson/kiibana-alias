import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
        textAlign: "center"
    },
    marginTop: {
        marginTop: 120
    }
});

const getFormattedNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function MetricChart({ hits, classx}) {
    const classes = useStyles();
    return (
        <Card className={`${classx} ${classes.root}`} component={Paper}>
            <CardContent key={`${hits.value} ${hits.unit}`} className={classes.marginTop}>
                <Typography variant="h2" component="h2">
                    {hits.unit === 'Count' ? getFormattedNumber(hits.value) : `${hits.value} ${hits.unit}`}
                </Typography>
				<Typography variant="h6" component="h6" >
                    {hits.labels}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default MetricChart;