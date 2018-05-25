import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MainDashboard.css';
import * as actionCreators from '../../store/actions'

class MainDashboard extends Component {
    
    componentDidMount() {
        // this.props.socket.emit('playersInWaitingRoom');
        // this.props.initialPlayers(this.props.socket);
        // this.props.socket.on('newPlayer',player => {
        //     console.log('newPlayer',player);
        //     this.props.changeInWaitingPlayers(player);
        // });
        
    }
    
    render() {
        return (
            <div className="main-dashboard">
            <p>Main</p>
            </div>
        )
    }
    
}

const mapStateToProps = state => {
    waitingPlayers: state.waitingPlayers
};

const mapDispatchToProps = dispatch => {
    return {
        initialPlayers: (socket) => dispatch(actionCreators.initialPlayers(socket)),
        changeInWaitingPlayers: (player,change) => dispatch({type:'CHANGE_IN_WAITING_PLAYERS',payload:{player:player,type:change}})
    }
}

export default MainDashboard;