import React, { Component } from "react";
import { connect } from "react-redux";

import MainDashboard from "../../mainDashboard/MainDashboard";
import * as actionCreators from "../../../store/actions";
import MainControls from "./mainControls/MainControls";
import "./Dashboard.css";
class Dashboard extends Component {
    componentDidMount() {
        this.props.getInitialRoomInfo(this.props.socket);
    }

    componentWillUnmount() {
        this.props.socket.emit("leaveServer");
    }

    render() {
        return (
            <div className="dashboard">
                <MainDashboard socket={this.props.socket} />
                <MainControls socket={this.props.socket} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        nickname: state.nickname,
        uuid: state.uuid,
        players: state.players
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getInitialRoomInfo: (socket, props) =>
            dispatch(actionCreators.getInitialRoomInfo(socket, props))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
