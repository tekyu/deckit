import React, {Component} from 'react';
import { connect } from 'react-redux';
import './Header.css';
import GameBoardHintInput from './components/GameBoardHintInput';
import GameBoardLabel from './components/GameBoardLabel';

class Header extends Component {
    state = {
        hintInput : null,
        state:null,
        amIHinter:false,
        shouldShowHintInput:false,
        hintFromRoom:null
    }
    
    onHintInputHandler = (event) => {
        console.log('hintinput',event.target.value);
        this.setState({hintInput:event.target.value});
    }    
    
    onSendHint = () => {
        let _data = {
            hint:this.state.hintInput,
            selectedCard:this.props.selectedCard,
            room:this.props.roomInfo.id
        };
        this.props.socket.emit('sendHint',_data);
        this.setState({shouldShowHintInput:false});
        console.log('[Header.js] [emitting] onSendHint()',_data);
    }
    
    
    static getDerivedStateFromProps(newProps,oldState) {
        console.log('[Header.js] getDerivedStateFromProps()',newProps,oldState);
        if (!newProps.roomInfo || !newProps.socket) {
            return {
                ...oldState
            }
        }
        
        return {
            ...oldState,
            stage:newProps.roomInfo.stage,
            amIHinter:newProps.roomInfo.hinter===newProps.socket.id?true:false,
            shouldShowHintInput:newProps.selectedCard?true:oldState.shouldShowHintInput,
            hintFromRoom:newProps.roomInfo.hint
        }
    }    
    render() {
        let label = 'Wait for a hint';

        if (this.state.amIHinter) {
            if (this.state.stage === 'hintable') {
                if (this.props.selectedCard) {
                    label = 'Think about your hint';
                    // this.state.shouldShowHintInput = true;
                } else {
                    label = 'Pick a card first';
                }
            } else if (this.state.stage === 'pickable') {
                label = `Your hint: ${this.state.hintFromRoom}. Wait for others`;
            }
            // } else if (this.state.stage === 'pickable') { 
            
        } else {
            let _labelContent = this.props.me.picked?'Wait for others':'Pick a card';
            label = `Hint: ${this.state.hintFromRoom}. ${_labelContent}`;
        }        
        
        return (
            <div className="gameboard-header">
            <GameBoardLabel>{label}</GameBoardLabel>
            
            {(this.state.stage === 'hintable' && this.state.amIHinter && this.state.shouldShowHintInput)?
            <GameBoardHintInput hintInput={this.onHintInputHandler} sendHint={this.onSendHint}/>
            :
            null 
        }
        </div>
    )
}
}

const mapStateToProps = state => {
    return {
        selectedCard:state.selectedCard,
        roomInfo:state.roomInfo
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // onSelectedCard: (data)=> dispatch({type:actionCreators.SELECTED_CARD,payload: {data}}),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Header);

// const Header = (props) => {
// console.log('[Header.js]',props);
// let header = <div>Wait for a hint</div>;
// let _hintInput = (<div>
//     Now set a hint
//     <div className="hint-container">
//     <input type="text" placeholder="Enter your hint here" onChange={props.onHintInputHandler}/>
//     <button onClick={props.onSendHint}>Set hint</button>
//     </div>
//     </div>); 

//     if (props.headerState.amIHinter) {
//         if (props.headerState.stage === 'hintable') {
//             if (props.headerState.enableHint) {
//                 //show input
//                 header = _hintInput;
//             } else {
//                 //pick card
//                 header = <div>Pick a card first</div>;
//             }
//         } else if (props.headerState.stage === 'pickable') {
//             //wait for others
//             header = <div><label>Your hint: {props.headerState.hint}</label><p>Wait for others</p></div>
//         }
//     } else if (props.headerState.stage === 'pickable') {
//         //pick card
//         console.log('TYKURWO',props);
//         header = <div><label>Hint: {props.headerState.hint}</label><p>{props.headerState.picked?'Wait for others':'Pick a card'}</p></div>;                
//     }


//     return header;
// };

// export default Header;