import React, { Component } from "react";
import { connect } from "react-redux";
import { listener, emitter } from "store/actions/socket";
import { withRouter } from "react-router-dom";
import * as styles from "./SidePanel.module.scss";
import ScorePanel from "./panels/score/ScorePanel";
import ChatPanel from "./panels/chat/ChatPanel";
import OptionsPanel from "./panels/options/OptionsPanel";
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */
class SidePanel extends Component {
  constructor(props) {
    super(props);
    console.log("panels", props);
    this.state = {
      openedPanel: "chat", // props.panels[0] || null, //TODO: temp
      score: [],
      chat: [],
      log: []
    };

    //TODO: Util function
    //TODO: Panels as components, import them
    this.panelMapping = {
      score: <ScorePanel scoreData={this.state.score} />,
      chat: <ChatPanel chatData={this.state.chat} />,
      options: <OptionsPanel />
    };
  }

  componentDidMount() {
    const { listener } = this.props;
    listener("scoreUpdate", data => {
      this.setState(() => {
        return { score: data };
      });
    });
    listener("incomingChatMessage", message => {
      this.setState(({ chat }) => {
        const newChatState = [...chat, message];
        return { chat: newChatState };
      });
    });
    listener("incomingLog", message => {
      this.setState(({ log }) => {
        const newLogState = [...log, message];
        return { chat: newLogState };
      });
    });
  }

  changePanel = ({ target }) => {
    this.setState(() => {
      return { openedPanel: target.getAttribute("name") };
    });
  };

  get panel() {
    return this.panelMapping[this.state.openedPanel];
  }

  get bubbles() {
    console.log("get bubbles");
    const { panels } = this.props;
    const { openedPanel } = this.state;
    const bubbleClass = styles.bubble;
    const openedBubbleClass = styles.openedPanel;
    return panels.map(panel => {
      const classes = [bubbleClass];
      if (openedPanel === panel) {
        classes.push(openedBubbleClass);
      }
      console.log("bubbles", classes, openedPanel, panel);
      return (
        <div
          name={panel}
          className={classes.join(" ")}
          onClick={this.changePanel}
          key={panel}
        ></div>
      );
    });
  }

  render() {
    return (
      <div className={styles.sidePanel}>
        <div className={styles.bubbles}>{this.bubbles}</div>
        <div className={styles.panel}>{this.panel}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { user } }) => {
  return {
    user
  };
};

const mapDispatchToProps = { emitter, listener };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidePanel);
