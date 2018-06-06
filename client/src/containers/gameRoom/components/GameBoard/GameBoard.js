import React, { Component } from "react";
import { connect } from "react-redux";
import "./GameBoard.css";
import * as actionCreators from "../../../../store/actions";
import Logo from "../../../../components/ui/logo/logo";
import WaitingModal from "./components/waitingModal/WaitingModal";
import Cards from './components/cards/Cards';
import Header from './components/header/Header';
class GameBoard extends Component {
  
  state = {
    playerReady: false,
    players:[],
    shouldCountdown: false,
    allReady: false,
    selectedCard:null,
    hintCard:null,
    hintInput:null,
    enableHint:false,
    amIHinter:false,
    started:false,
    hint:null
  }
  
  changeStatusHandler = () => {
    this.props.socket.emit('changePlayerStatusInRoom',{room:this.props.roomInfo.id,status:!this.state.playerReady});
    this.setState({playerReady: !this.state.playerReady});
    console.log('after emit',this.state.playerReady);
  }
  
  onSelectedCardHandler = (data) => {
    if (this.state.stage === 'hintable' && this.state.amIHinter) {
      this.setState({hintCard:data,enableHint:true});
    } else if (this.state.stage === 'pickable' && !this.state.amIHinter) {
      this.sendPickedCard = ({
        pickedCard:data,
        room:this.props.roomInfo.id
      });
    }
  }
  
  onHintInputHandler = (event) => {
    this.setState({hintInput:event.target.value});
  }
  
  sendPickedCard = (data) => {
    this.props.socket.emit('sendPickedCard',data);
    console.log('[GameBoard.js] [emitting] sendPickedCard()',data);
  }
  
  onSendHint = () => {
    let _data = {
      hint:this.state.hintInput,
      hintCard:this.state.hintCard,
      room:this.props.roomInfo.id
    };
    this.props.socket.emit('sendHint',_data);
    console.log('[GameBoard.js] [emitting] onSendHint()',_data);
  }
  
  static getDerivedStateFromProps(newProps,oldState) {
    console.log('[GameBoard.js] getDerivedStateFromProps()',newProps,oldState);
    if (!newProps.roomInfo) {
      return {
        ...oldState
      }
    }
    let cards = [];
    if (newProps.roomInfo.playersConnected && newProps.roomInfo.playersConnected[0].deck) {
      cards = newProps.roomInfo.playersConnected.filter(player=>{
        return newProps.socket.id === player.id
      })[0].deck;
    }
    return {
      ...oldState,
      players:newProps.roomInfo.playersConnected?newProps.roomInfo.playersConnected:oldState.players,
      // shouldCountdown: newProps.roomInfo?newProps.roomInfo.allReady:false
      allReady: newProps.roomInfo?newProps.roomInfo.allReady:false,
      cards:cards,
      stage:newProps.roomInfo.stage,
      amIHinter:newProps.roomInfo.hinter===newProps.socket.id?true:false,
      started:newProps.roomInfo.started,
      hint:newProps.roomInfo.hint
    }
  }
  
  componentDidMount() {
    console.log('[GameBoard.js] componentDidMount',this.props.roomInfo);
  }
  
  componentWillUnmount() {
    console.log('[GameBoard.js] componentWillUnmount()');
    this.props.socket.emit('leaveRoom',this.props.roomInfo.id);
  }
  
  
  render() {
    let headerState = {
      enableHint:this.state.enableHint,
      stage: this.state.stage,
      hint:this.state.hint,
      amIHinter:this.state.amIHinter
    };
    
    let content = null;
    
    if (this.props.roomInfo && this.props.roomInfo.waiting) {
      content = <WaitingModal allReady={this.state.allReady} players={this.state.players} changeStatus={this.changeStatusHandler} status={this.state.playerReady}/>;
    } else if (this.props.roomInfo && this.props.roomInfo.started) {
      content = <Cards stage={this.state.stage} amIHinter={this.state.amIHinter} cards={this.state.cards} socket={this.props.socket} selectedCard={this.onSelectedCardHandler} />
    }
    
    console.log('[GameBoard.js] render()',this.state.players,this.props.roomInfo);
    return (
      <div className="gameboard">
      {
        !this.state.started?
      <Logo/>
      :
      <Header data={headerState} onSendHint={this.onSendHint} onHintInputHandler={this.onHintInputHandler} />
      }

      {content}        
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
