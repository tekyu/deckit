import React, {Component} from 'react';
import { connect } from 'react-redux';
import './MainDashboardServers.css';
import * as actionCreators from '../../../../store/actions';
import Server from './components/Server';
class MainDashboardServers extends Component {

    state = {
        servers:[]
    }

    // static getDerivedStateFromProps(newProps, oldState) {
    //     console.log('[MainDashboardServer.js] {getDerivedStateFromProps}',newProps,oldState);
    //     return newProps.servers.length>oldState.servers.length?newProps:oldState;
    // }

    componentDidMount() {
        this.props.socket.on('updatedServers', (servers) => {
            console.log('[Receiving] updatedServers [in] MainDashboardServers.js',servers);
            this.props.onUpdateServers(servers);
        });
    }


    joinPublicServerHandler = (id) => {
        this.props.onJoinServer(this.props.socket,{id:id?id:this.state.serverId});
        console.log('[MainDashboardServer.js] joinPublicServerHandler',id);
    }

    render() {
        let serverList = null;
        console.log('SERVEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEERS',this.props.servers);
        if (this.props.servers){
            serverList = Object.keys(this.props.servers).map((key) => {
                return <Server key={this.props.servers[key].id} roomInfo = {this.props.servers[key]} joinPublicServer={this.joinPublicServerHandler} id={this.props.servers[key].id} name={this.props.servers[key].name} size={this.props.servers[key].size} connected={this.props.servers[key].playersConnected.length}/>
            });
            console.log('[MainDashboardServer.js] render()',serverList);
        }
        if (serverList && serverList.length === 0) {
            serverList = <label>No servers running</label>;
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
        onUpdateServers: (servers) => {dispatch(actionCreators.updateServers(servers))},
        onJoinServer: (socket,props) => dispatch(actionCreators.joinServer(socket,props)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainDashboardServers);