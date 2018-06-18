import React, { Component } from "react";
import { connect } from "react-redux";
import "./Header.css";
import GameBoardHintInput from "./components/GameBoardHintInput";
import GameBoardLabel from "./components/GameBoardLabel";

class Header extends Component {
    state = {
        hintInput: null,
        state: null,
        amIHinter: false,
        shouldShowHintInput: false,
        hintFromRoom: null,
        hinter: null,
        stage: null
    };

    onHintInputHandler = event => {
        this.setState({ hintInput: event.target.value });
    };

    onSendHint = () => {
        let _data = {
            hint: this.state.hintInput,
            selectedCard: this.props.selectedCard,
            room: this.props.roomInfo.id
        };
        this.props.socket.emit("sendHint", _data);
        this.setState({ shouldShowHintInput: false });
    };

    static getDerivedStateFromProps(newProps, oldState) {
        if (!newProps.roomInfo || !newProps.socket) {
            return {
                ...oldState
            };
        }

        let hinter = newProps.roomInfo.playersConnected.filter(player => {
            return player.id === newProps.roomInfo.hinter;
        })[0];

        return {
            ...oldState,
            stage: newProps.roomInfo.stage,
            amIHinter:
                newProps.roomInfo.hinter === newProps.socket.id ? true : false,
            shouldShowHintInput: newProps.selectedCard
                ? true
                : oldState.shouldShowHintInput,
            hintFromRoom: newProps.roomInfo.hint,
            hinter: hinter
        };
    }
    render() {
        let label = "Wait for a hint";
        if (this.state.amIHinter) {
            if (this.state.stage === "hintable") {
                if (!this.props.selectedCard) {
                    label = <label>Pick a card first</label>;
                } else {
                    label = <label>Think about your hint</label>;
                }
            } else {
                label = <label>Wait for others</label>;
            }
        } else {
            if (this.state.stage === "hintable") {
                label = (
                    <label>
                        Wait for{" "}
                        {this.state.hinter
                            ? this.state.hinter.nickname
                            : "player"}{" "}
                        to pick a hint
                    </label>
                );
            } else if (this.state.stage === "pickable") {
                if (!this.props.me.picked) {
                    label = <label>Pick your card</label>;
                } else {
                    label = <label>Wait for others</label>;
                }
            } else if (this.state.stage === "roundable") {
                if (!this.props.me.picked) {
                    label = <label>Pick best fitting card to hint</label>;
                } else {
                    label = <label>Wait for others</label>;
                }
            }
        }

        return (
            <div className="gameboard-header-container">
                <div className="gameboard-header">
                    {this.state.hintFromRoom ? (
                        <label>
                            {this.state.amIHinter ? "Your" : ""} Hint:{" "}
                            {this.state.hintFromRoom}
                        </label>
                    ) : null}
                    <GameBoardLabel>{label}</GameBoardLabel>

                    {this.state.stage === "hintable" &&
                    this.state.amIHinter &&
                    this.state.shouldShowHintInput ? (
                        <GameBoardHintInput
                            hintInput={this.onHintInputHandler}
                            sendHint={this.onSendHint}
                        />
                    ) : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedCard: state.selectedCard,
        roomInfo: state.roomInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
