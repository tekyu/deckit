import { UPDATE_MODAL } from "@store/actions/actionCreators";
import { CLOSE_MODAL } from "@store/actions/actionCreators";
import { OPEN_MODAL } from "@store/actions/actionCreators";

// export const updateModal = ({ showModal, modalType }) => {
// 	return {
// 		type: UPDATE_MODAL,
// 		payload: { showModal, modalType }
// 	};
// };

export const closeModal = () => {
	return {
		type: CLOSE_MODAL
	};
};

export const openModal = modalType => {
	return {
		type: OPEN_MODAL,
		payload: { modalType }
	};
};
