import React, { Component } from "react";
import { connect } from "react-redux";
import "./GameBoard.css";
import * as actionCreators from "../../../../store/actions";
import Logo from "../../../../components/ui/logo/logo";
import WaitingModal from "./components/waitingModal/WaitingModal";
import Cards from "./components/cards/Cards";
import Header from "./components/header/Header";
import CardBoard from "./components/CardBoard/CardBoard";
class GameBoard extends Component {
    state = {
        // playerReady: false,
        // players:[],
        // roomId:null,
        me: null,
        // shouldCountdown: false,
        // allReady: false,
        // selectedCard:null,
        // hintCard:null,
        // hintInput:null,
        // enableHint:false,
        // amIHinter:false,
        started: false
        // hint:null
    };

    // changeStatusHandler = () => {
    //   this.props.socket.emit('changePlayerStatusInRoom',{room:this.props.roomInfo.id,status:!this.state.playerReady});
    //   this.setState({playerReady: !this.state.playerReady});
    //   console.log('after emit',this.state.playerReady);
    // }

    // onSelectedCardHandler = (data) => {
    //   if (this.state.stage === 'hintable' && this.state.amIHinter) {
    //     this.setState({hintCard:data,enableHint:true});
    //   } else if (this.state.stage === 'pickable' && !this.state.amIHinter) {
    //     this.sendPickedCard({
    //       pickedCard:data,
    //       room:this.props.roomInfo.id,
    //       emit: 'sendPickedCard'
    //     });
    //   } else if (this.state.stage === 'roundable' && !this.state.amIHinter) {
    //     this.sendPickedCard({
    //       pickedCard:data,
    //       room:this.props.roomInfo.id,
    //       emit: 'sendRoundCard'
    //     })
    //   }
    // }

    onHintInputHandler = event => {
        this.setState({ hintInput: event.target.value });
    };

    // sendPickedCard = (data) => {
    //   const {pickedCard,room} = data;
    //   // const _data = {pickedCard,room};
    //   this.props.socket.emit(data.emit,{pickedCard,room});
    //   console.log('[GameBoard.js] [emitting] '+data.emit,data);
    // }

    onSendHint = () => {
        let _data = {
            hint: this.state.hintInput,
            hintCard: this.state.hintCard,
            room: this.props.roomInfo.id
        };
        this.props.socket.emit("sendHint", _data);
        console.log("[GameBoard.js] [emitting] onSendHint()", _data);
    };

    static getDerivedStateFromProps(newProps, oldState) {
        console.log(
            "[GameBoard.js] getDerivedStateFromProps()",
            newProps,
            oldState
        );
        if (!newProps.roomInfo || !newProps.socket) {
            return {
                ...oldState
            };
        }
        // let cards = [];
        // if (newProps.roomInfo.playersConnected && newProps.roomInfo.playersConnected[0].deck) {
        //   cards = newProps.roomInfo.playersConnected.filter(player=>{
        //     return newProps.socket.id === player.id
        //   })[0].deck;
        // }
        let me = newProps.roomInfo.playersConnected.filter(player => {
            return player.id === newProps.socket.id;
        })[0];
        console.log("MEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE", me);

        return {
            ...oldState,
            // players:newProps.roomInfo.playersConnected?newProps.roomInfo.playersConnected:oldState.players,
            // shouldCountdown: newProps.roomInfo?newProps.roomInfo.allReady:false
            // allReady: newProps.roomInfo?newProps.roomInfo.allReady:false,
            // cards:cards,
            // stage:newProps.roomInfo.stage,
            // amIHinter:newProps.roomInfo.hinter===newProps.socket.id?true:false,
            started: newProps.roomInfo.started,
            // hint:newProps.roomInfo.hint,
            me: me ? me : []
        };
    }

    componentDidMount() {
        console.log("[GameBoard.js] componentDidMount", this.props.roomInfo);
    }

    render() {
        // let headerProps = {
        //   headerState: {
        //     enableHint:this.state.enableHint,
        //     stage: this.state.stage,
        //     hint:this.state.hint,
        //     amIHinter:this.state.amIHinter,
        //     picked:this.state.me?this.state.me.picked:null
        //   },
        //   onSendHint:this.onSendHint,
        //   onHintInputHandler:this.onHintInputHandler
        // }
        // let headerState = {
        //   enableHint:this.state.enableHint,
        //   stage: this.state.stage,
        //   hint:this.state.hint,
        //   amIHinter:this.state.amIHinter,
        // };
        console.log(
            "[GameBoard.js] render()",
            this.state.players,
            this.props.roomInfo
        );
        return (
            <div className="gameboard">
                {!(this.state.started && this.state.me) ? (
                    <Logo />
                ) : (
                    <Header
                        socket={this.props.socket}
                        me={this.state.me}
                        room={
                            this.props.roomInfo ? this.props.roomInfo.id : null
                        }
                    />
                )
                // <Header {...headerProps} />
                }
                {this.state.me ? (
                    <CardBoard me={this.state.me} socket={this.props.socket} />
                ) : null}
                {this.state.me ? (
                    <Cards me={this.state.me} socket={this.props.socket} />
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    // rooms: state.rooms;
    return {
        roomInfo: state.roomInfo
        // selectedCard:state.selectedCard
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameBoard);
