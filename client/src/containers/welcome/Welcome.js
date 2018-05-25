import React, { Component } from 'react';
import './Welcome.css';
import * as actionCreators from '../../store/actions';
import { connect } from 'react-redux';
import Header from '../../components/welcome/header';
import Dashboard from '../dashboard/Dashboard';

class Welcome extends Component {
    
    state =  {
        nicknameInput: this.props.nickname?this.props.nickname:'',
        lengthError:false
    }
    
    getNameHandler = (event) => {
        this.setState({nicknameInput:event.target.value});
        console.log('setname',this.state.nicknameInput);
        if (this.state.nicknameInput.length > 5) {
            this.setState({lengthError:false});
        } else {
            this.setState({lengthError:true});
        }
    }

    
    startGame = () => {
        // console.log('NICK IS',this.state.nicknameInput);
        // this.props.onStartGame(this.state.nicknameInput,this.props.uuid);
        // this.props.socket.emit('getUUID',this.state.nicknameInput);
        // console.log('testscope',this.props.testState);
        console.log('startgame',this.state.nicknameInput.length);
        if (!this.state.lengthError) {
            this.props.setUUID(this.props.socket,this.state.nicknameInput);
        }
    }

    static getDerivedStateFromProps(s,p) {
        console.log('Welcome getDerivedStateFromProps',s,p);
    }
    
    componentDidMount() {
        // if (this.props.ls && this.props.ls.nickname) {
        //     this.setState({
        //         nicknameInput: this.props.ls.nickname,
        //         // uuid: this.props.ls.uuid
        //     });

        // } else {
        //     // this.props.socket.emit('getUUID');
        // }
        console.log('socket',this.props.socket);
        this.props.socket.on('playerConnected',(props) =>{
            console.log('User connected with id',props);
            console.log('Welcome playerConnected');
            this.props.onStartGame(this.props.socket,props);
            
        });

        this.props.socket.on('playersInWaitingRoom',players => {
            console.log('Welcome playersInWaitingRoom');
            // this.props.saveInitialPlayers(this.props.socket,players);
        });

    }
    
    
    render() {
        
        let initialComponent = (<div className="container welcome-container">
        <Header
        lengthError = {this.state.lengthError}
        name = {this.state.nicknameInput}
        getNameHandler = {this.getNameHandler}
        startGame = {this.startGame}
        />
        </div>);
        
        // if (this.props.auth) {
        //     const stringify = JSON.stringify(this.props.testState);
        //     console.log('SHOW KURWA P');
        //     console.log('testscope',this.props.testState);
        //     const style = {
        //         color:'#000'
        //     }
        //     initialComponent = (
        //         <React.Fragment>
        //         <Dashboard />
        //         <p style={style}>Your name is {this.props.nickname} and the state is {stringify}</p>
        //         </React.Fragment>
        //     );
            
        // }
        
        return (
            <React.Fragment>{initialComponent}</React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        testState: state,
        auth:state.auth,
        nickname: state.nickname,
        uuid:state.uuid
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onStartGame: (socket,props) => dispatch(actionCreators.startGame(socket,props)),
        // setLocalStorage: (ls) => dispatch({type:actionTypes.LOCAL_STORAGE,payload: {nickname:ls.nickname,uuid:ls.uuid}}),
        setUUID: (socket,nickname) => dispatch(actionCreators.playerConnect(socket,nickname))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Welcome);
