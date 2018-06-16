import React, { Component } from "react";
import { connect } from "react-redux";
import "./MainDashboardServers.css";
import * as actionCreators from "../../../../store/actions";
import Server from "./components/Server/Server";
import EmptyServerList from "./components/EmptyState/EmptyServerList";
class MainDashboardServers extends Component {
    state = {
        servers: []
    };

    componentDidMount() {
        this.props.socket.on("updatedServers", servers => {
            this.props.onUpdateServers(servers);
        });
    }

    joinPublicServerHandler = id => {
        this.props.onJoinServer(this.props.socket, {
            id: id ? id : this.state.serverId
        });
    };

    render() {
        let serverList = null;
        if (Object.keys(this.props.servers).length > 0) {
            serverList = Object.keys(this.props.servers).map(key => {
                return (
                    <Server
                        key={this.props.servers[key].id}
                        roomInfo={this.props.servers[key]}
                        joinPublicServer={this.joinPublicServerHandler}
                        id={this.props.servers[key].id}
                        name={this.props.servers[key].name}
                        size={this.props.servers[key].size}
                        connected={
                            this.props.servers[key].playersConnected.length
                        }
                    />
                );
            });
        }
        // if (serverList && serverList.length === 0) {
        //     serverList = <label>No servers running</label>;
        // }
        console.log("KURWA", this.props.servers ? true : false);
        return (
            <div className="main-dashboard-servers-wrapper">
                {Object.keys(this.props.servers).length > 0 ? (
                    serverList
                ) : (
                    <EmptyServerList />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        servers: state.servers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateServers: servers => {
            dispatch(actionCreators.updateServers(servers));
        },
        onJoinServer: (socket, props) =>
            dispatch(actionCreators.joinServer(socket, props))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainDashboardServers);
