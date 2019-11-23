import React from "react";
import LoginModal from "./LoginModal/LoginModal";
import RegisterModal from "./RegisterModal/RegisterModal";
import AnonymousLoginModal from "./AnonymousLoginModal/AnonymousLoginModal";

const modals = {
  login: <LoginModal />,
  register: <RegisterModal />,
  anonymous: <AnonymousLoginModal />
};

export default modals;
