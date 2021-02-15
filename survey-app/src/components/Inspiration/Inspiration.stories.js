import React from 'react';
import Chip from "@material-ui/core/Chip";
import store from '../../store.js';
import { addInsight}  from '../../actions/insight';
import { deleteInsight }  from '../../actions/insight';

export default class Inspiration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            id: '',
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
            }));

            store.dispatch(addInsight({id: this.props.id, label: this.props.label}));
        } else {
            this.setState((prevState, props) => ({
                variant: 'outlined',
                color: 'secondary'
            }));

            store.dispatch(deleteInsight({id: this.props.id, label: this.props.label}));
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
