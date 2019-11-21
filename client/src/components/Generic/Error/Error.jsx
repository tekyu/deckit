import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import * as styles from "./Error.module.scss";

class Error extends PureComponent {
  render() {
    return <div className={styles.container}>{this.props.message}</div>;
  }
}

// Error.propTypes = {
//   handler: PropTypes.func.isRequired,
//   options: PropTypes.array.isRequired,
//   selectedOption: PropTypes.string.isRequired
// };

export default Error;
