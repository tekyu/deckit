import React, { Component } from "react";
import { connect } from "react-redux";

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

export default connect(mapStateToProps)(OptionsPanel);
