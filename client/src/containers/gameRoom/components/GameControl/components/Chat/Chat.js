import React, { Component } from "react";
import { connect } from "react-redux";
import "./Chat.css";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class Chat extends Component {
  state = {
    msg: '',
    roomId: null,
    messages: []
  };

  messageHandler = e => {
    this.setState({ msg: e.target.value });
  };

  sendMessage = e => {
    console.log("[Chat.js] sendMessage()", e);
    if (this.state.msg) {
      this.props.socket.emit(
        "messageSentFromClient",
        this.state.roomId,
        this.state.msg
      );
      console.log(
        "[Chat.js][emitting] messageSentFromClient",
        this.state.roomId,
        this.state.msg
      );
      this.setState({
        messages: [
          ...this.state.messages,
          {
            msg: this.state.msg,
            id: this.props.socket.id,
            color: this.props.socket.color,
            nickname: this.props.socket.nickname,
            mine: true
          }
        ]
      });
      this.setState({msg:''});
      console.log(
        "[Chat.js][emitting] messageSentFromClien2t",
        this.state.messages
      );
    }
  };

  static getDerivedStateFromProps(newProps, oldState) {
    console.log("[Chat.js] getDerivedStateFromProps()", newProps, oldState);
    return {
      ...oldState,
      roomId:
        newProps.roomInfo && newProps.roomInfo.id
          ? newProps.roomInfo.id
          : oldState.roomId
    };
  }

  componentDidMount() {
    console.log("Chat.js {componentDidMount()}");
    this.props.socket.on("messageSentToRoom", (data) => {
      console.log("[receiving] messageSentToRoom()", data);
      this.setState({
        messages: [
          ...this.state.messages,
          {
            msg: data.msg,
            id: data.id,
            color: data.color,
            nickname: data.nickname,
            mine: false
          }
        ]
      });
    });
  }

  componentDidUpdate() {
      console.log('[Chat.js] componentDidUpdate()',this.refs);
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
    console.log("[Chat.js] render()", this.state.messages);
    let messagesToRender = null;
    messagesToRender = this.state.messages.map((msg,i) => {
      let style = {
        background: msg.color
      };
      let classes = "chat-content";
      if (msg.mine) {
        classes += " chat-reversed";
      }
      return (
        <div className="chat-message-wrapper" key={i}>
            <div className={classes}>
                <label>{msg.mine?'You':msg.nickname}</label>
                <p style={style}>{msg.msg}</p>
            </div>
        </div>
      );
    });
    return (
      <div className="chat-container">
        <div className="chat-header">
          <label>Chat</label>
          <span>Hide</span>
        </div>
        <div className="chat-body" ref="chatList">{messagesToRender}</div>
        <div className="chat-footer">
          <input
            onChange={this.messageHandler}
            onKeyPress={e => (e.charCode == 13 ? this.sendMessage(e) : null)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
