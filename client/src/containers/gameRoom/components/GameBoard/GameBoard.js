import React, { Component } from "react";
import { connect } from "react-redux";
import "./GameBoard.css";
import * as actionCreators from "../../../../store/actions";
import Logo from "../../../../components/ui/logo/logo";

class GameBoard extends Component {

  componentDidMount() {
    // this.props.socket.emit('playersInWaitingRoom');
    // this.props.initialPlayers(this.props.socket);
    // this.props.socket.on('newPlayer',player => {
    //     console.log('newPlayer',player);
    //     this.props.changeInWaitingPlayers(player);
    // });
  }

  render() {
    return (
      <div className="gameboard">
        <div className="gameboard-wrapper">
          <div className="gameboard-header">
            <Logo />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // rooms: state.rooms;
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default GameBoard;
