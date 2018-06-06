import React, {Component} from 'react';
import Card from './components/Card';
import './Cards.css';

class Cards extends Component {
    state = {
        selectedCard:null,
        reassure:false,
    }
    
    onClickedHandler = (id) => {
        console.log('[Cards.js] onClickedHandler %s',id, typeof id,this.state.selectedCard, typeof this.state.selectedCard);
        this.setState({
            reassure:!this.state.reassure,
            selectedCard:id===this.state.selectedCard?null:id
        });
    }
    
    onReassureHandler = (data) => {
        console.log('[Cards.js] onReassureHandler',data);
        // this.props.socket.emit('');
        this.props.selectedCard(data);
    }
    
    // }
    render() {
        console.log('[Cards.js] render()');
        let turnClickedHandler = (()=>{
            if (this.props.stage==='hintable' && this.props.amIHinter) {
                return true;
            } else if (this.props.stage==='pickable' && !this.props.amIHinter) {
                return true;
            } else {
                return false;
            }
        })();
        let cards = this.props.cards.map(card=>{
            return <Card 
            onClickedHandler={turnClickedHandler?this.onClickedHandler:null} 
            onReassureHandler={this.props.amIHinter?this.onReassureHandler:null} 
            data={card} 
            key={card.id} 
            reassure={this.state.selectedCard} />
        });
        return (
            <div className="cards-container">
            {cards}
            </div>
        );    
    }
};

export default Cards;