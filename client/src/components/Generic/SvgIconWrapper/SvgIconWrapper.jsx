import React from "react";
import PropTypes from "prop-types";
import { SvgIcon } from "@material-ui/core";

const SvgIconWrapper = ({ path, viewBox = `0 0 24 24`, ...props }) => (
  <SvgIcon {...props} viewBox={viewBox}>
    {path}
  </SvgIcon>
);

SvgIconWrapper.defaultProps = {
  viewBox: `0 0 24 24`,
};

SvgIconWrapper.propTypes = {
  path: PropTypes.string.isRequired,
  viewBox: PropTypes.string,
};

export default SvgIconWrapper;
