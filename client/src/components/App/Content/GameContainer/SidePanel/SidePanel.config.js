import React from "react";
import ScorePanel from "./panels/score/ScorePanel";
import ChatPanel from "./panels/chat/ChatPanel";
import OptionsPanel from "./panels/options/OptionsPanel";

export const panels = [
  {
    color: `dodgerBlue`,
    component: <ChatPanel />,
    icon: `comments`,
    iconColor: `white`,
    key: `chat`
  },
  {
    color: `coral`,
    component: <OptionsPanel />,
    icon: `cog`,
    iconColor: `dimGray`,
    key: `options`
  },
  {
    color: `indigo`,
    component: <ScorePanel />,
    icon: `star`,
    iconColor: `gold`,
    key: `score`
  }
];
