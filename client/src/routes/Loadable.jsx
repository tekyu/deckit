import React from 'react';
import Loadable from 'react-loadable';

const Login = Loadable({
  loader: () => import('containers/Auth/Login/LoginForm'),
  loading() {
    return <p>Loading...</p>;
  }
});

const Register = Loadable({
  loader: () => import('containers/Auth/Register/RegisterForm'),
  loading() {
    return <p>Loading...</p>;
  }
});

const Logout = Loadable({
  loader: () => import('containers/Auth/Logout/Logout'),
  loading() {
    return <p>Loading...</p>;
  }
});

const Browse = Loadable({
  loader: () => import('containers/Browse/Browse'),
  loading() {
    return <p>Loading...</p>;
  }
});

const CreateGame = Loadable({
  loader: () => import('containers/CreateGame/CreateGame'),
  loading() {
    return <p>Loading...</p>;
  }
});

export { Login, Register, Logout, Browse, CreateGame };
