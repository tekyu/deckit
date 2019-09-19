import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ModalContainer from "modals/ModalContainer";
import Header from "./Header/Header";
import Content from "./Content/Content";

import { initializeSocket } from "store/actions/socket";
import io from "socket.io-client";

class App extends Component {
	componentDidMount() {
		// const socket = io("localhost:3012");
		// this.props.initializeSocket(socket);
	}
	render() {
		const { auth, modalType, showModal } = this.props;
		return (
			<React.Fragment>
				<Header />
				<Content auth={auth} />
				{showModal && <ModalContainer type={modalType} />}
			</React.Fragment>
		);
	}
}

App.propTypes = {
	auth: PropTypes.bool.isRequired,
	modalType: PropTypes.string,
	showModal: PropTypes.bool.isRequired,
	initializeSocket: PropTypes.func
};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		modalType: state.modalType,
		showModal: state.showModal
	};
};
const mapDispatchToProps = {
	initializeSocket
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
