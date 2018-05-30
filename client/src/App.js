import React, { Component } from 'react';

// import logo from './logo.svg';
import './App.css';

import Welcome from './containers/welcome/Welcome';
import * as actionTypes from './store/actions';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Dashboard from './containers/dashboard/Dashboard';
import GameRoom from './containers/gameRoom/GameRoom';
// import asyncComponent from './hoc/async-component';
const socket = io('http://localhost:5000');
// const asyncDashboard = asyncComponent( () => {
//   return import ();
// });
class App extends Component {
  
  state = {
    ls:null,
    // auth:this.props.auth
  }
  
  isJsonValid = obj => {
    try {
      JSON.parse(obj);
      return true;
    } catch (err) {
      return false;
    }
  }
  

  componentDidMount() {
    console.log('stateeeee_____',this.props.teststate);
    const _uuid = null;
    const ls = localStorage.getItem('dekso');
    if (ls && this.isJsonValid(ls)) {
      this.setState({ls:ls});
      // this.props.onLocalStorageProps(ls);
      console.log('GOT DATA FROM LOCAL STORAGE');
    }
  }

  render() {
  let componentToRender = (<Welcome socket={socket} ls={this.state.ls}/>);
    if (this.props.auth) {
      componentToRender = (<Dashboard socket={socket} />);
    }
    if (this.props.shouldRenderRoom) {
      componentToRender = (<GameRoom socket={socket} />);
    } 
    console.log('COMPONENTTORENDER',componentToRender);
    return (
      <React.Fragment>{componentToRender}</React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    teststate:state,
    auth:state.auth,
    uuid:state.uuid,
    shouldRenderRoom:state.shouldRenderRoom
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onLocalStorageProps: (ls) => dispatch({type:actionTypes.LOCAL_STORAGE,payload: {nickname:ls.nickname,uuid:ls.uuid}})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
