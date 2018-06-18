import React, { Component } from "react";
import "./MainDashboard.css";
import Logo from "../../components/ui/logo/logo";
import MainDashboardControls from "./components/controls/MainDashboardControls";
import MainDashboardServers from "./components/servers/MainDashboardServers";

class MainDashboard extends Component {
	render() {
		return (
			<div className="main-dashboard">
				<div className="main-dashboard-wrapper">
					<div className="main-dashboard-header">
						<Logo />
					</div>
					<MainDashboardControls socket={this.props.socket} />
					<MainDashboardServers socket={this.props.socket} />
				</div>
			</div>
		);
	}
}

export default MainDashboard;
