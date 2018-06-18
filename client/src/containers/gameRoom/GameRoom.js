import React, { Component } from "react";
import { connect } from "react-redux";
import "./GameRoom.css";

import GameBoard from "./components/GameBoard/GameBoard";
import WaitingModal from "./components/GameBoard/components/WaitingModal/WaitingModal";
import GameControl from "./components/GameControl/GameControl";
class GameRoom extends Component {
    state = {
        playerReady: false,
        players: [],
        roomId: null,
        round: 0
    };
    changeStatusHandler = () => {
        this.props.socket.emit("changePlayerStatusInRoom", {
            room: this.props.roomInfo.id,
            status: !this.state.playerReady
        });
        this.setState({ playerReady: !this.state.playerReady });
    };

    static getDerivedStateFromProps(newProps, oldState) {
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
                    : oldState.players,
                roomId: newProps.roomInfo.id,
                round: newProps.roomInfo.round
            };
        }
    }

    componentWillUnmount() {
        this.props.socket.emit("leaveRoom", this.props.roomInfo.id);
    }

    render() {
        let content = null;
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
                <GameControl
                    socket={this.props.socket}
                    roomId={this.state.roomId}
                    round={this.state.round}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
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
