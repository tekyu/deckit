import React, {Component} from 'react';
import { connect } from 'react-redux';
import './MainDashboardServers.css';
import * as actionCreators from '../../../../store/actions';
import Server from './components/Server';
class MainDashboardServers extends Component {

    state = {
        servers:[]
    }

    static getDerivedStateFromProps(newProps, oldState) {
        console.log('[MainDashboardServer.js] {getDerivedStateFromProps}',newProps,oldState);
        return newProps.servers.length>oldState.servers.length?newProps:oldState;
    }

    componentDidMount() {
        this.props.socket.on('updatedServers', (servers) => {
            console.log('[Receiving] updatedServers [in] MainDashboardServers.js',servers);
            this.props.onUpdateServers(servers);
        });
    }


    joinPublicServerHandler = (id) => {
        console.log('[MainDashboardServer.js] joinPublicServerHandler',id);
    }

    render() {
        let serverList = <label>No servers running</label>;
        if (this.props.servers.length>0){
            serverList = this.props.servers.map(server => {
                return <Server key={server.id} joinPublicServer={this.joinPublicServerHandler} id={server.id} name={server.name} size={server.size} connected={server.playersConnected.length}/>
            });
    
        }

        return (
            <div className="main-dashboard-servers-wrapper">
                {/* <label>Servers</label> */}
                {serverList}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        servers:state.servers
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateServers: (servers) => {dispatch(actionCreators.updateServers(servers))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainDashboardServers);