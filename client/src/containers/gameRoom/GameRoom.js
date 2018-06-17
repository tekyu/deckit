import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import "./GameRoom.css";

import GameBoard from "./components/GameBoard/GameBoard";
import WaitingModal from "./components/GameBoard/components/waitingModal/WaitingModal";
import GameControl from "./components/GameControl/GameControl";
class GameRoom extends Component {
    state = {
        playerReady: false,
        players: []
    };
    changeStatusHandler = () => {
        this.props.socket.emit("changePlayerStatusInRoom", {
            room: this.props.roomInfo.id,
            status: !this.state.playerReady
        });
        this.setState({ playerReady: !this.state.playerReady });
        console.log("after emit", this.state.playerReady);
    };

    static getDerivedStateFromProps(newProps, oldState) {
        console.log(
            "[GameRoom.js] getDerivedStateFromProps()",
            newProps,
            oldState
        );
        if (!newProps.roomInfo || !newProps.socket) {
            return {
                ...oldState
            };
        } else {
            return {
                ...oldState,
                allReady: newProps.roomInfo
                    ? newProps.roomInfo.allReady
                    : false,
                players: newProps.roomInfo.playersConnected
                    ? newProps.roomInfo.playersConnected
                    : oldState.players
            };
        }
    }

    componentWillUnmount() {
        console.log("[GameRoom.js] componentWillUnmount()");
        this.props.socket.emit("leaveRoom", this.props.roomInfo.id);
    }

    render() {
        // let players = null;
        // console.log('[GameRoom.js] render()',this.props.roomInfo);
        // if (this.props.roomInfo && this.props.roomInfo.playersConnected) {
        // players = <Players socket={this.props.socket} />;
        // }
        let content = null;
        console.log("RENDERRRRFJFLKSDJFLKSDJFLSDKFJSDLFSDKJFSDKF", this.props);
        if (this.props.roomInfo && this.props.roomInfo.waiting) {
            content = (
                <WaitingModal
                    allReady={this.state.allReady}
                    players={this.state.players}
                    changeStatus={this.changeStatusHandler}
                    status={this.state.playerReady}
                />
            );
        } else if (this.props.roomInfo && this.props.roomInfo.started) {
            content = <GameBoard socket={this.props.socket} />;
        }

        return (
            <div className="gameroom">
                {content}
                {/* <GameBoard socket={this.props.socket}/> */}
                <GameControl socket={this.props.socket} />
                {/* <div className="gameroom-controls">
					{players}
					<div className="gameroom-controls-wrapper" />
					<Chat socket={this.props.socket} />
				</div> */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // store:state,
        roomInfo: state.roomInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameRoom);
