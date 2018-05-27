import React, {Component} from 'react';
import { connect } from 'react-redux';
import './MainDashboardServers.css';

class MainDashboardServers extends Component {

    static getDerivedStateFromProps(newProps, oldState) {
        console.log('[MainDashboardServer.js] {getDerivedStateFromProps}',newProps,oldState);
    }

    render() {
        return (
            <div className="main-dashboard-servers">
                <p>Servers</p>
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

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainDashboardServers);