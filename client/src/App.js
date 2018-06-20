import React, { Component } from "react";

// import logo from './logo.svg';
import "./App.css";
import Welcome from "./containers/welcome/Welcome";
import * as actionCreators from "./store/actions";
import { connect } from "react-redux";
import io from "socket.io-client";
import Dashboard from "./containers/WaitingRoom/dashboard/Dashboard";
import GameRoom from "./containers/gameRoom/GameRoom";
import fontawesome from "@fortawesome/fontawesome";
import FontAwesomeIcons from "./misc/icons/icons";
fontawesome.library.add(FontAwesomeIcons);

const socket = io("http://localhost:3011");
class App extends Component {
    state = {
        ls: null,
        uuid: null
        // auth:this.props.auth
    };

    isJsonValid = obj => {
        try {
            JSON.parse(obj);
            return true;
        } catch (err) {
            return false;
        }
    };

    componentDidMount() {
        // const ls = localStorage.getItem("dekso");
        // if (ls && this.isJsonValid(ls)) {
        // 	this.setState({ ls: ls });
        // 	// this.props.onLocalStorageProps(ls);
        // }

        this.props.onUpdateRoom(socket);
    }

    render() {
        let componentToRender = <Welcome socket={socket} ls={this.state.ls} />;
        if (this.props.auth) {
            componentToRender = <Dashboard socket={socket} />;
        }
        if (this.props.shouldRenderRoom) {
            componentToRender = <GameRoom socket={socket} />;
        }
        return <React.Fragment>{componentToRender}</React.Fragment>;
    }
}
const mapStateToProps = state => {
    return {
        teststate: state,
        auth: state.auth,
        uuid: state.uuid,
        shouldRenderRoom: state.shouldRenderRoom
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLocalStorageProps: ls =>
            dispatch({
                type: actionCreators.LOCAL_STORAGE,
                payload: { nickname: ls.nickname, uuid: ls.uuid }
            }),
        onUpdateRoom: socket => dispatch(actionCreators.updateRoom(socket))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
