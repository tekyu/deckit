import Loadable from "react-loadable";
import React from "react";

const Login = Loadable({
  loader: () => import(`containers/Auth/Login/LoginForm`),
  loading() {
    return <p>Loading...</p>;
  }
});

const Register = Loadable({
  loader: () => import(`containers/Auth/Register/RegisterForm`),
  loading() {
    return <p>Loading...</p>;
  }
});

const Logout = Loadable({
  loader: () => import(`containers/Auth/Logout/Logout`),
  loading() {
    return <p>Loading...</p>;
  }
});

const Browse = Loadable({
  loader: () => import(`components/App/Content/Browse/Browse`),
  loading() {
    return <p>Loading...</p>;
  }
});

const CreateGame = Loadable({
  loader: () => import(`containers/CreateGame/CreateGame`),
  loading() {
    return <p>Loading...</p>;
  }
});

const GameContainer = Loadable({
  loader: () => import(`containers/GameContainer/GameContainer`),
  loading() {
    return <p>Loading...</p>;
  }
});

const Profile = Loadable({
  loader: () => import(`containers/Profile/Profile`),
  loading() {
    return <p>Loading...</p>;
  }
});

export { Login, Register, Logout, Browse, CreateGame, GameContainer, Profile };
