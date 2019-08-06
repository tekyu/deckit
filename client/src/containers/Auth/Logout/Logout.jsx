import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from 'store/actions/user';

class Logout extends Component {
  componentDidMount() {
    logoutUser();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = {
  logoutUser
};
export default connect(
  null,
  mapDispatchToProps
)(Logout);
