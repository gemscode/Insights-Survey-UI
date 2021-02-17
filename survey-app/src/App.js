import './css/App.css';
import React, {Component} from "react";
import {Avatar, Divider, LinearProgress} from "@material-ui/core";
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
          dataLoaded: false,
          API_URL: "http://localhost:3090"
      }

      if (typeof process.env.API_URL !== 'undefined')
            this.state.API_URL = process.env.API_URL;

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
    };

    loadMoods() {
        return fetch(this.state.API_URL+"/api/moods", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => response.json()).catch( err => {
            throw {source: "loadMoods", err:err};
        })
    };

    loadInsights() {
        return fetch(this.state.API_URL+"/api/inspirations", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => response.json()).catch( err => {
            throw {source: "loadInsights", err:err};
        })
    };

    loadPersons(){
        return fetch(this.state.API_URL+"/api/persons", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => response.json()).catch( err => {
            throw {source: "loadPersons", err:err};
        })
    };

  componentDidMount() {

      Promise.all([ this.loadMoods(), this.loadInsights(), this.loadPersons()])
          .then (([moods, insights, persons]) => {
              this.setState({
                  dataLoaded: true,
                  moods: moods,
                  inspirations: insights,
                  persons: persons,
              })
          }).catch((err) => {
              console.log(err);
          });
  }

  render() {
      let {dataLoaded, moods, inspirations, persons} = this.state;

      if (!dataLoaded) {
          return <LinearProgress />;
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
