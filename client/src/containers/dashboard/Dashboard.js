import React, { Component } from 'react';
import { connect } from 'react-redux';

import MainDashboard from '../mainDashboard/MainDashboard';
import Players from '../players/Players';
import Chat from '../chat/Chat';
import './Dashboard.css';
import * as actionCreators from '../../store/actions';
class Dashboard extends Component {
    
    componentDidMount() {
        // localStorage.setItem
        // this.props.socket.on('playersInWaitingRoom',players => {
        //     console.log('[Receiving] playersInWaitingRoom [in] Dashboard.js',players);
        //     this.props.saveInitialPlayers(this.props.socket,players);
        // });
        console.log('state dashboard',this.props.teststate);
        this.props.getInitialRoomInfo(this.props.socket);

    }

    componentWillUnmount() {
        console.log('[Dashboard.js] componentWillUnmount()');
        this.props.socket.emit('leaveServer');
    }
    
    static getDerivedStateFromProps(n,v) {
        console.log('GET DERIVED DASHBOARD',n,v);
    }

    render() {
        return (
            <div className="dashboard">
                <MainDashboard socket={this.props.socket}/>
                <div className="dashboard-right">
                    <Players socket={this.props.socket}/>
                    <Chat socket={this.props.socket}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        nickname: state.nickname,
        uuid: state.uuid,
        teststate:state,
        players:state.players
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getInitialRoomInfo: (socket,props) => dispatch(actionCreators.getInitialRoomInfo(socket,props))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);