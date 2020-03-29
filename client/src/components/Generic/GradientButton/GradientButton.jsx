import React from "react";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";

const StyledButton = withStyles({
  root: {
    background: `background-image: linear-gradient(
            35deg,
            #2ac9db -10%, #009bff 47%,
            #cf77f3 130%
        `,
    borderRadius: 6,
    border: 0,
    fontSize: "14px",
    padding: "16px 32px",
    letterSpacing: "0.1em",
    cursor: "pointer",
    marginTop: "20px",
    transition: "all 0.3s ease-out",
    boxShadow: "0px 2px 7px 0px rgba(0, 0, 0, 0.28)"
  }
})(Button);

const GradientButton = props => {
  const { classes, children, className, ...other } = props;

  return (
    <StyledButton className={clsx(classes.root, className)} {...other}>
      {children || "class names"}
    </StyledButton>
  );
};

export default GradientButton;
