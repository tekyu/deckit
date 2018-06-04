import React, { Component } from "react";
import { connect } from "react-redux";
import "./MainDashboard.css";
import * as actionCreators from "../../store/actions";
import Logo from "../../components/ui/logo/logo";
import MainDashboardControls from './components/controls/MainDashboardControls';
import MainDashboardServers from './components/servers/MainDashboardServers';

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
        <div className="main-dashboard-wrapper">
          <div className="main-dashboard-header">
            <Logo />
          </div>
          <MainDashboardControls socket={this.props.socket}/>
          <MainDashboardServers socket={this.props.socket}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // rooms: state.rooms;
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default MainDashboard;
