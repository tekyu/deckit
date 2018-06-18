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
        if (!newProps.roomInfo || !newProps.socket) {
            return {
                ...oldState
            };
        }
        return {
            ...oldState,
            cards: newProps.me.deck,
            stage: newProps.roomInfo.stage,
            amIHinter:
                newProps.roomInfo.hinter === newProps.socket.id ? true : false
        };
    }

    onClickedHandler = id => {
        this.setState({
            reassure: !this.state.reassure,
            selectedCard: id === this.state.selectedCard ? null : id
        });
    };

    onReassureHandler = data => {
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
    };

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

        let cardProps = {
            onReassureHandler: this.onReassureHandler,
            reassure: this.state.selectedCard
        };

        let cards = this.state.cards.map(card => {
            cardProps.data = card;
            cardProps.key = card.id;
            cardProps.selected =
                this.state.selectedCard &&
                this.state.selectedCard.id === card.id
                    ? true
                    : false;

            if (turnClickedHandler) {
                cardProps.onClickedHandler = this.onClickedHandler;
            }
            return <Card {...cardProps} />;
        });
        let cardsWrapperClasses = ["cards-wrapper"];
        if (this.state.stage === "roundable") {
            cardsWrapperClasses.push("cards-wrapper-hide");
        }
        return (
            <div className={cardsWrapperClasses.join(" ")}>
                <div className="cards-container">{cards}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
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
