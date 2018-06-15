import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Players.css';
import Player from '../../components/players/player/Player';
import PlayersHeader from '../../components/players/header/header';
class Players extends Component {

    state = {
        players:[]
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('PLAYERS',nextProps, prevState);
        // this.setState({players:nextProps.players});
        return {
            ...prevState,
            players:nextProps.players.length>prevState.players?nextProps.player:prevState.players
        }
    }

    componentDidMount() {
        console.log('[Players.js] componentDidMount',this.state.players);
        const _playersFromState = [...this.props.players];
        this.setState({players:_playersFromState});
        console.log('[Players.js] socket',this.props.socket);
        this.props.socket.on('playersInWaitingRoom', (players) => {
            console.log('[Receiving] playersInWaitingRoom [in] Players.js',players);
            this.setState({players:players});
        });
    }

    render() {
        console.log('Player render',this.state.players.length,this.state);
        let mappedPlayers = null;
        if (this.state.players.length>0) {
            console.log('PLAYERS NOW',this.state.players);
            mappedPlayers = this.state.players.map(player => {
                console.log('player',player);
                return <Player data={player} key={player.id} />
            });    
        }
        return (
            <div className="players-container">
                <PlayersHeader roomSize={this.state.players.length} />
                <div className="players">
                    {mappedPlayers}
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        players:state.players
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Players);