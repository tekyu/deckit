import React, { Component } from "react";
import { connect } from "react-redux";
import { listener, emitter } from "store/actions";
// import * as styles from "./Deckit.module.scss";
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */
class OptionsPanel extends Component {
  // constructor() {
  //   super(props);
  // }
  state = {};

  render() {
    return <div>options</div>;
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
)(OptionsPanel);
