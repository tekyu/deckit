import { UPDATE_MODAL } from "@store/actions/actionCreators";

export const updateModal = ({ showModal, modalType }) => {
	return {
		type: UPDATE_MODAL,
		payload: { showModal, modalType }
	};
};
