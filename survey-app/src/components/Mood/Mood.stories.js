import React from 'react';
import Chip from "@material-ui/core/Chip";
import store from '../../store.js';
import { addMood }  from '../../actions/mood';
import { deleteMood }  from '../../actions/mood';

export default class Mood extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            id: '',
            label: '',
            variant: 'outlined',
            color: 'secondary'
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.state.selected = !this.state.selected

        if (this.state.selected) {
            this.setState((prevState, props) => ({
                variant: 'default',
                color: 'primary'
            }))

            store.dispatch(addMood({id: this.props.id, label: this.props.label}));
        } else {
            this.setState((prevState, props) => ({
                variant: 'outlined',
                color: 'secondary'
            }))

            store.dispatch(deleteMood({id: this.props.id,  label: this.props.label}));
        }
    }

    render() {
        return (
            <Chip id={this.props.id}
                  avatar={this.props.avatar}
                  label={this.props.label}
                  variant={this.state.variant}
                  color={this.state.color}
                  style={{margin: '5px'}}
                  onClick={this.onClick}/>
        );
    }
}
