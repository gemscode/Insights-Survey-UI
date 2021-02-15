import React, {Component} from 'react'
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Field, formValueSelector, getFormValues, reduxForm} from 'redux-form';
import {connect, useSelector} from 'react-redux'

class SurveyForm extends Component {

    constructor(props) {
        super(props)
    }

    renderInput = (form, meta) => (
        <TextField
            {...form.input}
            multiline
            rows={3}
            size='small'
            variant="outlined"
            style={{width: '35ch'}}
            />
    )

    result = (userLogin, moodList, insightList, insightPerson, noteInput) => {

        if (userLogin == '')
            userLogin = [{survey_id:2, user_id:"114ea085-1410-43c6-b347-1d7a900fdc51"}];

        if (insightPerson.id == '')
            insightPerson = {id: "3f0ea315-3086-424d-bcea-b388b45e5b49"};

        let moodInput = []
        moodList.map(item => moodInput.push({ mood_id: item.mood.id }));

        let insightInput = []
        insightList.map(item => insightInput.push({insight_id: item.insight.id, person_id: insightPerson.id}));

        let surveyNote = [{note: noteInput}];

        let staticNote = [{"note":"my other web note"}]

        let data = {
            user: userLogin,
            mood: moodInput,
            insight: insightInput,
            note: surveyNote
        };

        return data;
    }

    onSubmit = (values) => {

        let surveyData = []
        let insightEr = this.props.insightEr;
        let moodList = this.props.moodsList;
        let insightList = this.props.insightList;

        if ((moodList && moodList.length == 0) && ( insightList &&  insightList.length == 0))
            window.alert(" \n Please select \n 1. One or more feelings \n 2. One or more insight \n\n Thank you!");
         else if (moodList && moodList.length == 0)
            window.alert(" \n Please select \n 1. One or more feelings \n\n Thank you!");
        else if (insightList && insightList.length == 0)
            window.alert(" \n Please select \n 1. One or more insight \n\n Thank you!");
        else {
            surveyData = this.result('', moodList, insightList, insightEr, (typeof values.noteInput !== "undefined" ? values.noteInput : ''));

            const options = {
                method: 'POST',
                body: JSON.stringify(surveyData),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            fetch('http://localhost:3080/api/survey/campaign', options)
                .then(res => res.json())
                .then(res => {
                    if (res.error)
                        window.alert(res.error);
                    else
                        window.alert("\n\n Your insight was successfully recorded. \n You can find it in 'My Diary' from the main menu!\n\n");
                })
                .catch(error => console.log(error));
        }

    }

    required = v => {

        if (!v || v === '') {
            return 'This field is required'
        }

        return undefined;
    }

    render() {

        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="noteInput" component={this.renderInput}/>
                <p/>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        )
    }
}

SurveyForm = reduxForm({
    form: "SurveyForm",
})(SurveyForm);

const selector = formValueSelector('SurveyForm');

function mapStateToProps(state) {
    const noteInput = selector(state, 'noteInput');
    return {
        memory: state.memory,
        insightEr: state.insighter.person,
        moodsList: state.moods.moodList,
        insightList: state.insights.insightList,
        noteInput: noteInput
    }
}

export default connect(mapStateToProps)(SurveyForm);