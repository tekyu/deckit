import React from "react";
import { SvgIcon } from "@material-ui/core";
import { ReactComponent as CardsIconSvg } from "../../../assets/icons/freepick/cards.svg";

const ChatIcon = props => {
  return <SvgIcon {...props} component={CardsIconSvg} viewBox="0 0 512 512" />;
};

export default ChatIcon;
