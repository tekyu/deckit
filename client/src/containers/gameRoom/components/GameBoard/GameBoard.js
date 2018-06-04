import React, { Component } from "react";
import { connect } from "react-redux";
import "./GameBoard.css";
import * as actionCreators from "../../../../store/actions";
import Logo from "../../../../components/ui/logo/logo";
import WaitingModal from "./components/waitingModal/WaitingModal";

class GameBoard extends Component {

  state = {
    playerReady: false,
    players:[],
    shouldCountdown: false,
    allReady: false,
  }

  changeStatusHandler = () => {
    this.setState({playerReady: !this.state.playerReady});
    this.props.socket.emit('changePlayerStatusInRoom',{room:this.props.roomInfo.id,status:this.state.playerReady});
  }

  static getDerivedStateFromProps(newProps,oldState) {
    // this.setState({players:newProps.})
    console.log('[GameBoard.js] getDerivedStateFromProps()',newProps,oldState);
    return {
      ...oldState,
      players:(newProps.roomInfo && newProps.roomInfo.playersConnected)?newProps.roomInfo.playersConnected:oldState.players,
      // shouldCountdown: newProps.roomInfo?newProps.roomInfo.allReady:false
      allReady: newProps.roomInfo?newProps.roomInfo.allReady:false
    }
  }

  componentDidMount() {
    // this.props.socket.emit('playersInWaitingRoom');
    // this.props.initialPlayers(this.props.socket);
    // this.props.socket.on('newPlayer',player => {
    //     console.log('newPlayer',player);
    //     this.props.changeInWaitingPlayers(player);
    // });
    console.log('[GameBoard.js] componentDidMount',this.props.roomInfo);
  }

  componentWillUnmount() {
    console.log('[GameBoard.js] componentWillUnmount()');
    this.props.socket.emit('leaveRoom',this.props.roomInfo.id);
  }

  render() {
    let partToRender = null;

    if (this.props.roomInfo && this.props.roomInfo.waiting) {
      partToRender = <WaitingModal allReady={this.state.allReady} players={this.state.players} changeStatus={this.changeStatusHandler} status={this.state.playerReady}/>;
    } else if (this.props.roomInfo && this.props.roomInfo.started) {
      
    }
    console.log('[GameBoard.js] render()',this.state.players)
    return (
      <div className="gameboard">
        <div className="gameboard-wrapper">
          <div className="gameboard-header">
            <Logo />
          </div>
          {partToRender}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // rooms: state.rooms;
  return {
    roomInfo:state.roomInfo,
  }
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps,mapDispatchToProps)(GameBoard);
