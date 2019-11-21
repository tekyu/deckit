export const CLOSE_MODAL = `CLOSE_MODAL`;
export const OPEN_MODAL = `OPEN_MODAL`;
export const UPDATE_MODAL = `UPDATE_MODAL`;

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

export const openModal = modalType => {
  return {
    type: OPEN_MODAL,
    modalType
  };
};

// export const updateModal = ({ showModal, modalType }) => {
// 	return {
// 		type: UPDATE_MODAL,
// 		payload: { showModal, modalType }
// 	};
// };
