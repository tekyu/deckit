import React from "react";
import PropTypes from "prop-types";
import * as styles from "./Error.module.scss";

const Error = ({ message }) => {
  return <div className={styles.container}>{message}</div>;
};

Error.propTypes = {
  message: PropTypes.string.isRequired
};

export default Error;
