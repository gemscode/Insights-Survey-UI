import React from 'react';
import store from '../../store.js';
import { addPerson, deletePerson}  from '../../actions/insighter';
import { addMemory, deleteMemory}  from '../../actions/memory';
import {Avatar, makeStyles} from "@material-ui/core";
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

class PersonAvatar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: true,
            insight: false
        }

        this.onClick = this.onClick.bind(this);
    }

    onClick() {

        if (this.props.memory.object  != "" && this.props.memory.object.id === this.props.id) {
            store.dispatch(deletePerson());

            this.state.selected = false;
        } else {
            store.dispatch(addMemory({ id: this.props.id, name: this.props.name, img: this.props.img }));

            store.dispatch(addPerson({ id: this.props.id, name: this.props.name, img: this.props.img }));
            this.state.selected = true;
        }

    }

    render() {
        if (this.props.img != "")
            return ( <Avatar id={this.props.id} alt={this.props.name} src={this.props.img} onClick={this.onClick} className={useStyles.small}/> );
        else
            return ( <> </> )
    }

}

function mapStateToProps(state) {
    return {
        memory: state.memory
    }
}

export default connect(mapStateToProps)(PersonAvatar)