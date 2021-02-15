import './css/App.css';
import React, {Component} from "react";
import {Avatar, Container, Divider, TextareaAutosize, TextField} from "@material-ui/core";
import Mood from "./components/Mood/Mood.stories";
import Inspiration from "./components/Inspiration/Inspiration.stories";
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {red} from "@material-ui/core/colors";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import FeedbackSelection from "./components/Feedback/Feedback.stories";
import PersonAvatar from "./components/PersonAvatar/PersonAvatar.stories";
import SurveyForm from "./components/Forms/SurveyForm";

const styles = muiBaseTheme => ({
    card: {
        maxWidth: 300,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    },
    media: {
        paddingTop: "56.25%"
    },
    content: {
        textAlign: "left",
        padding: muiBaseTheme.spacing.unit * 3
    },
    divider: {
        margin: `${muiBaseTheme.spacing.unit * 3}px 0`
    },
    heading: {
        fontWeight: "bold"
    },
    subheading: {
        lineHeight: 1.8
    },
    avatar: {
        display: "inline-block",
        border: "2px solid white",
        "&:not(:first-of-type)": {
            marginLeft: -muiBaseTheme.spacing.unit
        }
    }
});

class App extends Component {

    constructor(props) {
      super(props);

      this.state = {
          moods: [],
          inspirations: [],
          persons: [],
          areMoodsLoaded: false,
          areInspirationsLoaded: false,
          arePersonsLoaded: false,
      }

      this.useStyle = makeStyles((theme) => ({
          root: {
              maxWidth: 345,
              pl: 10,
              '& .MuiTextField-root': {
                  width: '35ch',
              },
          },
          avatar: {
              backgroundColor: red[500],
          },
      }));
  }

  componentDidMount() {
      Promise.all([
          fetch('http://localhost:3080/api/moods')
              .then(res => res.json())
              .then(json => {
                  this.setState({
                      areMoodsLoaded: true,
                      moods: json,
                  })
              }),
          fetch('http://localhost:3080/api/inspirations')
              .then(res => res.json())
              .then(json => {
                  this.setState({
                      areInspirationsLoaded: true,
                      inspirations: json,
                  })
              }),
          fetch('http://localhost:3080/api/persons')
              .then(res => res.json())
              .then(json => {
                  this.setState({
                      arePersonsLoaded: true,
                      persons: json,
                  })
              }),
      ])
  }

  render() {
      let {areMoodsLoaded, areInspirationsLoaded, arePersonsLoaded, moods, inspirations, persons} = this.state;

      if (!(areMoodsLoaded && areInspirationsLoaded && arePersonsLoaded)) {
          return <div> loading ...</div>;
      } else {
          if (!Array.isArray(moods)) {
              moods = [moods]
          }

          if (!Array.isArray(inspirations)) {
              inspirations = [inspirations]
          }

          return (
             <Card elevation={0}>
                 <CardHeader
                     avatar={
                         <Avatar aria-label="insight" style={{backgroundColor: red[500]}}>I</Avatar>
                     }
                     action={
                         <IconButton aria-label="settings">
                             <MoreVertIcon />
                         </IconButton>
                     }
                     title="Insights"
                     subheader="Your daily mood gage"
                 />
                 <CardContent>
                     <Typography variant="body2" color="textPrimary">
                         How are you feeling now?
                     </Typography>
                     {
                         moods.map(item => (<span><Mood id={item.id} label={item.description.trim()}/></span>))
                     }
                     <Divider style={{marginTop: '15px',marginBottom: '10px'}}/>
                     <Typography variant="body2" color="textPrimary">
                         What inspired that?
                     </Typography>
                     {
                         inspirations.map(item => (<span><Inspiration id={item.id} label={item.description.trim()} /></span>))
                     }
                     <AvatarGroup max={4}>
                         {
                             persons.map(item => (<PersonAvatar id={item.id} name={item.name} img={item.img}/>))
                         }
                     </AvatarGroup>
                     <Divider style={{marginTop: '15px', marginBottom: '10px'}}/>
                     <Typography variant="body2" color="textPrimary">
                         Your findings
                     </Typography>
                     <FeedbackSelection />
                     <Typography variant="body2" color="textPrimary">
                         Would you like to share more?
                     </Typography>
                     <SurveyForm/>
                 </CardContent>
             </Card>
          );
      }
  }
}

export default App;
