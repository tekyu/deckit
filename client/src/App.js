import React, { Component } from 'react';

// import logo from './logo.svg';
import './App.css';
import Welcome from './containers/welcome/Welcome';
import * as actionCreators from './store/actions';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Dashboard from './containers/dashboard/Dashboard';
import GameRoom from './containers/gameRoom/GameRoom';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faUserCircle from '@fortawesome/fontawesome-free-solid/faUserCircle';
import faAlignRight from '@fortawesome/fontawesome-free-solid/faAlignRight';
import faChessQueen from '@fortawesome/fontawesome-free-solid/faChessQueen';
import faPaperPlane from '@fortawesome/fontawesome-free-solid/faPaperPlane';
import faUser from '@fortawesome/fontawesome-free-regular/faUser';
fontawesome.library.add(faUser, faPaperPlane, faUserCircle, faAlignRight, faChessQueen);

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

    this.props.onUpdateRoom(socket);

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
      <React.Fragment>
      {componentToRender}
      </React.Fragment>
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
    onLocalStorageProps: (ls) => dispatch({type:actionCreators.LOCAL_STORAGE,payload: {nickname:ls.nickname,uuid:ls.uuid}}),
    onUpdateRoom: (socket) => dispatch(actionCreators.updateRoom(socket))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
