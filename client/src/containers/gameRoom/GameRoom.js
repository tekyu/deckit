import React, { Component } from "react";
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions';
import './GameRoom.css';

import GameBoard from './components/GameBoard/GameBoard';
import Players from './components/Players/Players';
import Chat from './components/Chat/Chat';
class GameRoom extends Component {
    static getDerivedStateFromProps(newProps, oldState) {
        console.log('[GameRoom.js] getDerivedStateFromProps()',newProps, oldState);        
    }
      componentDidMount() {
          console.log('[GameRoom.js] componentDidMount()',this.props.roomInfo);
      }

  render() {
    return (
        <div className="gameroom">
        <GameBoard socket={this.props.socket}/>
        <div className="gameroom-controls">
            <Players players={this.props.roomInfo.playersConnected} socket={this.props.socket}/>
            <Chat socket={this.props.socket}/>
        </div>
    </div>

    );
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

export default connect(mapStateToProps,mapDispatchToProps)(GameRoom);
