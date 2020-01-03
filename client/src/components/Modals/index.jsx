import React from "react";
import LoginModal from "./LoginModal/LoginModal";
import RegisterModal from "./RegisterModal/RegisterModal";
import AnonymousLoginModal from "./AnonymousLoginModal/AnonymousLoginModal";

export const LOGIN_MODAL = `LOGIN_MODAL`;
export const REGISTER_MODAL = `REGISTER_MODAL`;
export const ANONYMOUS_MODAL = `ANONYMOUS_MODAL`;

export const modals = {
  [LOGIN_MODAL]: {
    component: <LoginModal />,
    title: `Login`
  },
  [REGISTER_MODAL]: {
    component: <RegisterModal />,
    title: `Register`
  },
  [ANONYMOUS_MODAL]: {
    component: <AnonymousLoginModal />,
    title: `Choose your username`
  }
};
