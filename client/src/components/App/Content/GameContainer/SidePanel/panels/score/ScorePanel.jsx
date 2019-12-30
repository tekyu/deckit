import React, { Component } from "react";
import { connect } from "react-redux";
import { listener, emitter } from "store/actions";
import ScoreElement from "./components/ScoreElement";
import * as styles from "./ScorePanel.module.scss";
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */
class ScorePanel extends Component {
  // constructor() {
  //   super(props);
  // }
  state = {};

  mockData = [
    {
      id: `test1`,
      avatar: null,
      username: `test1`,
      color: `red`,
      progress: 0.4,
      points: 14
    },
    {
      id: `test2`,
      avatar: null,
      username: `test2`,
      color: `black`,
      progress: 0.7,
      points: 17
    },
    {
      id: `test3`,
      avatar: null,
      username: `test3`,
      color: `purple`,
      progress: 0.6,
      points: 16
    }
  ];

  get scoreComponents() {
    return this.mockData.map(score => {
      console.log(`mockdata`, score);
      return <ScoreElement key={score.id} data={score} />;
    });
  }

  render() {
    return <div className={styles.container}>{this.scoreComponents}</div>;
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
)(ScorePanel);
