import React, { Component } from "react";
import { connect } from "react-redux";
import sillyname from "sillyname";
import { gameMapping, inputOnChangeHandler } from "utils";
import { listener, emitter } from "store/actions/socket";
import { CREATE_ROOM } from "store/actions/socketCreators";
import { withRouter } from "react-router-dom";
import * as styles from "./Deckit.module.scss";
import SidePanel from "../GameContainer/SidePanel/SidePanel";
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */
class Deckit extends Component {
  render() {
    console.log(`Deckit`, this.props);
    return (
      <div className={styles.table}>
        <div className={styles.draft}></div>
        <div className={`${styles.hand}`}></div>
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
)(Deckit);
