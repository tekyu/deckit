import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ModalContainer from "modals/ModalContainer";
import Header from "./Header/Header";
import Content from "./Content/Content";

const App = ({ auth, modalType, showModal }) => {
	return (
		<React.Fragment>
			<Header />
			<Content auth={auth} />
			{showModal && <ModalContainer type={modalType} />}
		</React.Fragment>
	);
};

App.propTypes = {
	auth: PropTypes.bool.isRequired,
	modalType: PropTypes.string,
	showModal: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		modalType: state.modalType,
		showModal: state.showModal
	};
};

export default connect(mapStateToProps)(App);
