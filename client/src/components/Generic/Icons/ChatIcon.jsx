import React from "react";
import { SvgIcon } from "@material-ui/core";
import { ReactComponent as ChatIconSvg } from "../../../assets/icons/freepick/chat.svg";

const ChatIcon = () => {
  return <SvgIcon component={ChatIconSvg} viewBox="0 0 512 512" />;
};

export default ChatIcon;
