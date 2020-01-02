import React, { Component } from "react";
import { connect } from "react-redux";
import { addListener } from "store/actions";
import * as styles from "./Deckit.module.scss";

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

const mapDispatchToProps = { addListener };
export default connect(mapStateToProps, mapDispatchToProps)(Deckit);
