import React from 'react';
import './Header.css';
import Logo from '../../../../../../components/ui/logo/logo';
const Header = (props) => {
    console.log('[Header.js]',props);
    let header = <div>Wait for a hint</div>;
    let _hintInput = (<div>
        Now set a hint
        <div className="hint-container">
        <input type="text" placeholder="Enter your hint here" onChange={props.onHintInputHandler}/>
        <button onClick={props.onSendHint}>Set hint</button>
        </div>
        </div>); 
        
        if (props.data.amIHinter) {
            if (props.data.stage === 'hintable') {
                if (props.data.enableHint) {
                    //show input
                    header = _hintInput;
                } else {
                    //pick card
                    header = <div>Pick a card first</div>;
                }
            } else if (props.data.stage === 'pickable') {
                //wait for others
                header = <div>Wait for others</div>;
            }
        } else if (props.data.stage === 'pickable') {
            //pick card
            header = <div>Pick a card</div>;                
        }
        
        
        return header;
    };
    
    export default Header;