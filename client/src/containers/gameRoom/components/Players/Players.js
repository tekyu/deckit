import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Players.css';
// import Player from '../../components/players/player/Player';
import Player from './components/player/Player';
class Players extends Component {

    state = {
        players:[]
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('[Players.js] getDerivedStateFromProps',nextProps, prevState);
        if (nextProps.roomInfo && nextProps.roomInfo.playersConnected) {
            return {
                ...prevState,
                players:nextProps.roomInfo.playersConnected>prevState.players?nextProps.roomInfo.playersConnected:prevState.players
            }
        } else {
            return {...prevState}
        }
    }

    componentDidMount() {
        console.log('[Players.js] componentDidMount',this.state.roomInfo);
        const _playersFromState = (this.props.roomInfo && this.props.roomInfo.playersConnected)?[...this.props.roomInfo]:[];
        this.setState({players:_playersFromState});
    }

    render() {
        console.log('[Players.js] render',this.state);
        let mappedPlayers = null;
        if (this.state.players.length>0) {
            mappedPlayers = this.state.players.map(player => {
                return <Player key={player.id} data={player}  />
            });    
        }
        return (
            <div className="players-container">
                <div className="players">
                    {mappedPlayers}
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        roomInfo:state.roomInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Players);