import React, { Component } from "react";
import { connect } from "react-redux";
import "./MainDashboardControls.css";
import CreateModal from "./partials/CreateModal";
import JoinModal from "./partials/JoinModal";
import * as actionCreators from "../../../../store/actions";
class MainDashboardControls extends Component {
    //  showCreateModal={this.showCreateModalHandler} showJoinModal={this.showJoinModalHandler}
    state = {
        showCreateModal: false,
        showJoinModal: false,
        roomFull: false,
        serverName: "",
        serverSize: 6,
        serverPrivate: false,

        serverId: ""
    };

    showCreateModalHandler = () => {
        this.setState({ showCreateModal: !this.state.showCreateModal });
    };

    showJoinModalHandler = () => {
        this.setState({ showJoinModal: !this.state.showJoinModal });
    };

    changeServerNameHandler = event => {
        this.setState({ serverName: event.target.value });
    };
    changeServerSize = event => {
        this.setState({ serverSize: +event.target.value });
    };
    changePrivateMode = event => {
        this.setState({ serverPrivate: event.target.value });
    };

    changeServerIdHandler = event => {
        this.setState({ serverId: event.target.value });
    };

    createServerHandler = () => {
        // this.props.socket.emit('createServer',{name:this.state.serverName,size:this.state.serverSize,private:this.state.serverPrivate});
        console.log(
            "[MainDashboardControls.js] createServer",
            this.props.socket,
            {
                name: this.state.serverName,
                size: this.state.serverSize,
                private: this.state.serverPrivate
            }
        );
        this.props.onCreateServer(this.props.socket, {
            name: this.state.serverName,
            size: this.state.serverSize,
            private: this.state.serverPrivate
        });
    };

    joinServerHandler = id => {
        console.log("1", id);
        this.props.onJoinServer(this.props.socket, {
            id: id ? id : this.state.serverId
        });
    };

    componentDidMount() {
        this.props.socket.on("roomFull", () => {
            this.setState({ roomFull: true });
        });
    }

    render() {
        let modal = null;
        if (this.state.showCreateModal) {
            modal = (
                <CreateModal
                    createServer={this.createServerHandler}
                    initialSize={this.state.serverSize}
                    initialMode={this.state.serverPrivate}
                    changeName={this.changeServerNameHandler}
                    changeSize={this.changeServerSize}
                    changeMode={this.changePrivateMode}
                    closeHandler={this.showCreateModalHandler}
                />
            );
        } else if (this.state.showJoinModal) {
            modal = (
                <JoinModal
                    roomFull={this.state.roomFull}
                    changeId={this.changeServerIdHandler}
                    joinServer={this.joinServerHandler}
                    closeHandler={this.showJoinModalHandler}
                />
            );
        }

        return (
            <div className="main-dashboard-controls">
                {modal}
                <button
                    onClick={this.showCreateModalHandler}
                    className="main-dashboard-create-server">
                    Create
                </button>
                <button
                    onClick={this.showJoinModalHandler}
                    className="main-dashboard-join-server">
                    Join
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {
    return {
        onCreateServer: (socket, props) =>
            dispatch(actionCreators.createServer(socket, props)),
        onJoinServer: (socket, props) =>
            dispatch(actionCreators.joinServer(socket, props))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainDashboardControls);
