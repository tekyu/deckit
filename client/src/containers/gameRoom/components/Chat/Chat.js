import React, { Component } from 'react';
import { connect } from 'react-redux';


class Chat extends Component {

    static getDerivedPropsFromState(np,os) {
        console.log('Chat.js {getDerivedPropsFromState()}');        
    }

    componentDidMount() {
        console.log('Chat.js {componentDidMount()}');
    }

    render() {
        return (
            <p>Chat</p>
        )
    }
}

export default Chat;