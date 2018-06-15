import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "./components/Card";
import "./Cards.css";
import * as actionCreators from "../../../../../../store/actions";

class Cards extends Component {
    state = {
        selectedCard: null,
        reassure: false,
        cards: [],
        amIHinter: false,
        stage: null
    };

    static getDerivedStateFromProps(newProps, oldState) {
        console.log(
            "[Cards.js] getDerivedStateFromProps()",
            newProps,
            oldState
        );
        if (!newProps.roomInfo || !newProps.socket) {
            return {
                ...oldState
            };
        }
        // let cards = [];
        // if (
        //     newProps.roomInfo.playersConnected &&
        //     newProps.roomInfo.playersConnected[0].deck
        // ) {
        //     cards = newProps.roomInfo.playersConnected.filter(player => {
        //         return newProps.socket.id === player.id;
        //     })[0].deck;
        // }

        return {
            ...oldState,
            cards: newProps.me.deck,
            stage: newProps.roomInfo.stage,
            amIHinter:
                newProps.roomInfo.hinter === newProps.socket.id ? true : false
        };
    }

    onClickedHandler = id => {
        console.log(
            "[Cards.js] onClickedHandler %s",
            id,
            typeof id,
            this.state.selectedCard,
            typeof this.state.selectedCard
        );
        this.setState({
            reassure: !this.state.reassure,
            selectedCard: id === this.state.selectedCard ? null : id
        });
    };

    onReassureHandler = data => {
        console.log("[Cards.js] onReassureHandler", data);
        // this.props.socket.emit('');
        this.props.onSelectedCard(data);
        this.onSelectedCardHandler(data);
    };

    onSelectedCardHandler = data => {
        if (this.state.stage === "pickable" && !this.state.amIHinter) {
            this.sendPickedCard({
                pickedCard: data,
                room: this.props.roomInfo.id,
                emit: "sendPickedCard"
            });
        } else if (this.state.stage === "roundable" && !this.state.amIHinter) {
            this.sendPickedCard({
                pickedCard: data,
                room: this.props.roomInfo.id,
                emit: "sendRoundCard"
            });
        }
    };

    sendPickedCard = data => {
        const { pickedCard, room } = data;
        this.props.socket.emit(data.emit, { pickedCard, room });
        console.log("[Cards.js] [emitting] " + data.emit, data);
    };

    // }
    render() {
        let turnClickedHandler = (() => {
            if (this.props.me.picked) {
                return false;
            } else if (
                this.state.stage === "hintable" &&
                this.state.amIHinter
            ) {
                return true;
            } else if (
                this.state.stage === "pickable" &&
                !this.state.amIHinter
            ) {
                return true;
            } else {
                return false;
            }
        })();
        console.log(
            "[Cards.js] render()",
            this.props,
            this.state,
            turnClickedHandler
        );

        let cardProps = {
            onReassureHandler: this.onReassureHandler,
            reassure: this.state.selectedCard
        };

        let cards = this.state.cards.map(card => {
            cardProps.data = card;
            cardProps.key = card.id;

            if (turnClickedHandler) {
                cardProps.onClickedHandler = this.onClickedHandler;
            }
            return <Card {...cardProps} />;
        });

        return (
            <div className="cards-wrapper">
                <div className="cards-container">{cards}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    // rooms: state.rooms;
    return {
        roomInfo: state.roomInfo,
        selectedCard: state.selectedCard
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectedCard: data =>
            dispatch({ type: actionCreators.SELECTED_CARD, payload: { data } })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cards);
