import React, { Component } from "react";
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions';
import './GameRoom.css';

import GameBoard from './components/GameBoard/GameBoard';
import Players from './components/Players/Players';
import Chat from './components/Chat/Chat';
class GameRoom extends Component {
    // static getDerivedStateFromProps(newProps, oldState) {
    //     console.log('[GameRoom.js] getDerivedStateFromProps()',newProps.roomInfo, oldState);
    //     return {
    //         ...oldState,
    //         ...newProps.roomInfo
    //     }  
    // }
    //   componentDidMount() {
    //       console.log('[GameRoom.js] componentDidMount()',this.props.store,this.props.roomInfo);
    //   }

    //   componentWillUnmount() {
    //     console.log('[GameRoom.js] componentWillUnmount()');
    //     this.props.socket.emit('leaveRoom',this.props.roomInfo.id);
    //   }

  render() {
    let players = null;
    // console.log('[GameRoom.js] render()',this.props.roomInfo);
    // if (this.props.roomInfo && this.props.roomInfo.playersConnected) {
        players = <Players socket={this.props.socket}/>
    // }
    return (
        <div className="gameroom">
        <GameBoard socket={this.props.socket}/>
        <div className="gameroom-controls">
            {players}
            <div className="gameroom-controls-wrapper"></div>
            <Chat socket={this.props.socket}/>
        </div>
    </div>

    );
  }
}

const mapStateToProps = state => {
    return {
        // store:state,
        // roomInfo:state.roomInfo
    }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(GameRoom);
