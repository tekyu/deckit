import React, { Component } from "react";
import { connect } from "react-redux";
import "./Chat.css";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

class Chat extends Component {
    state = {
        msg: "",
        roomId: null,
        messages: [],
        showChat: true
    };

    messageHandler = e => {
        this.setState({ msg: e.target.value });
    };

    hideChatHandler = () => {
        this.setState({ showChat: !this.state.showChat });
    };

    sendMessage = e => {
        if (this.state.msg) {
            this.props.socket.emit(
                "messageSentFromClient",
                this.state.roomId,
                this.state.msg
            );
            this.setState({
                messages: [
                    ...this.state.messages,
                    {
                        msg: this.state.msg,
                        id: this.props.socket.id,
                        nickname: this.props.socket.nickname,
                        mine: true
                    }
                ]
            });
            this.setState({ msg: "" });
        }
    };

    static getDerivedStateFromProps(newProps, oldState) {
        return {
            ...oldState,
            roomId:
                newProps.roomInfo && newProps.roomInfo.id
                    ? newProps.roomInfo.id
                    : oldState.roomId
        };
    }

    componentDidMount() {
        this.props.socket.on("messageSentToRoom", data => {
            this.setState({
                messages: [
                    ...this.state.messages,
                    {
                        msg: data.msg,
                        id: data.id,
                        nickname: data.nickname,
                        mine: false
                    }
                ]
            });
        });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        const { chatList } = this.refs;
        const scrollHeight = chatList.scrollHeight;
        const height = chatList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        chatList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    render() {
        let messagesToRender = null;
        messagesToRender = this.state.messages.map((msg, i) => {
            const classes = ["chat-content"];
            if (msg.mine) {
                classes.push("chat-reversed");
            }
            return (
                <div className="chat-message-wrapper" key={i}>
                    <div className={classes.join(" ")}>
                        <label>{msg.mine ? "You" : msg.nickname}</label>
                        <div className="chat-message-container">
                            <p>{msg.msg}</p>
                        </div>
                    </div>
                </div>
            );
        });

        let chatClasses = ["chat-container"];
        if (!this.state.showChat) {
            chatClasses.push("chat-hidden");
        }
        return (
            <div className={chatClasses.join(" ")}>
                <div className="chat-header">
                    <label>Chat</label>
                    <span className="chat-hide" onClick={this.hideChatHandler}>
                        Hide
                    </span>
                </div>
                <div className="chat-body" ref="chatList">
                    {messagesToRender}
                </div>
                <div className="chat-footer">
                    <input
                        onChange={this.messageHandler}
                        onKeyPress={e =>
                            e.charCode === 13 ? this.sendMessage(e) : null
                        }
                        type="text"
                        placeholder="Send your message"
                        value={this.state.msg}
                    />
                    <button onClick={this.sendMessage}>
                        <FontAwesomeIcon icon="paper-plane" />
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        roomInfo: state.roomInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);
