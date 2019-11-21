import React, { Component } from "react";
import { inputOnChangeHandler } from "utils/genericInput";
import styled from "styled-components";
import { connect } from "react-redux";
import { emitter } from "store/actions/socket";

const Container = styled.div`
  display: flex;
`;
class ChatControls extends Component {
  constructor(props) {
    super(props);
    this.sentMessageHandler = this.sentMessageHandler.bind(this);
    const inputOptions = {
      keys: [`enter`],
      handler: this.sentMessageHandler
    };
    this.inputOnChangeHandler = inputOnChangeHandler.bind(this, inputOptions);
    this.state = {
      message: ``
    };
  }

  sentMessageHandler() {
    const { emitter, activeRoomId } = this.props;
    const { message } = this.state;
    console.log(`sentMessageHandler`, this.state.message);
    emitter(`sendingMessage`, { activeRoomId, message });
    // TODO: ACTIVE ROOM IN REDUX
  }

  render() {
    return (
      <Container>
        <div>d</div>
        <input
          name="message"
          type="text"
          onKeyPress={this.inputOnChangeHandler}
        />
        <button onClick={this.sentMessageHandler}></button>
      </Container>
    );
  }
}
const mapStateToProps = ({ room: { activeRoomId } }) => {
  return {
    activeRoomId
  };
};
const mapDispatchToProps = { emitter };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatControls);
