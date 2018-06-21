import React, { Component } from "react";
import { connect } from "react-redux";
import "./Players.css";
import Player from "./components/player/Player";
import PlayersHeader from "./components/header/header";
class Players extends Component {
    state = {
        players: []
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            ...prevState,
            players:
                nextProps.players.length > prevState.players
                    ? nextProps.player
                    : prevState.players
        };
    }

    componentDidMount() {
        const _playersFromState = [...this.props.players];
        this.setState({ players: _playersFromState });
        this.props.socket.on("playersInWaitingRoom", players => {
            this.setState({ players: players });
        });
    }

    componentWillUnmount() {
        this.props.socket.off("playersInWaitingRoom", players => {
            this.setState({ players: players });
        });
    }

    render() {
        let mappedPlayers = null;
        if (this.state.players.length > 0) {
            mappedPlayers = this.state.players.map(player => {
                return <Player data={player} key={player.id} />;
            });
        }
        return (
            <div className="players-container">
                <PlayersHeader roomSize={this.state.players.length} />
                <div className="players">{mappedPlayers}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        players: state.players
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Players);
