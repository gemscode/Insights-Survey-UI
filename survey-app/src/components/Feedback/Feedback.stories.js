import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import {useSelector} from "react-redux";
import Chip from "@material-ui/core/Chip";
import PersonAvatar from '../PersonAvatar/PersonAvatar.stories';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
}));

export default function FeedbackSelection() {
    const classes = useStyles();
    const insightList = useSelector(state => state.insights.insightList);
    const insightEr = useSelector(state => state.insighter);

    let personImg = "", personName = "", personId = "";

    if  (insightEr.person.img !== "")
    {
        personId = insightEr.person.id;
        personImg = insightEr.person.img;
        personName = insightEr.person.name;
    }

    let children = insightList.map(item => (
        <Chip label={item.insight.label} style={{margin: '5px'}} avatar={<PersonAvatar id={personId} name={personName} img={personImg} source={"insight"}/>}/>
        ));

    return (
        <div className={classes.root} >
            <Paper id="paperInsight" elevation={0} style={{backgroundColor: 'white', width: "45ch"}} >
                {children}
            </Paper>
        </div>
    );
}