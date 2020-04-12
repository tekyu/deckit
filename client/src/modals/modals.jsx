import React from "react";
import LoginModal from "./LoginModal/LoginModal";
import RegisterModal from "./RegisterModal/RegisterModal";
import AnonymousLoginModal from "./AnonymousLoginModal/AnonymousLoginModal";

const modals = {
  login: { component: <LoginModal />, title: `Login` },
  register: { component: <RegisterModal />, title: `Register` },
  anonymous: {
    component: <AnonymousLoginModal />,
    title: `Choose Your username`
  }
};

export default modals;
