import React from "react";
import { SvgIcon } from "@material-ui/core";

const SvgIconWrapper = ({ path, viewBox = `0 0 24 24`, ...props }) => {
  return (
    <SvgIcon {...props} viewBox={viewBox}>
      {path}
    </SvgIcon>
  );
};

export default SvgIconWrapper;
