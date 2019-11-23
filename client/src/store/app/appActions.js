export const CLOSE_MODAL = `CLOSE_MODAL`;
export const OPEN_MODAL = `OPEN_MODAL`;
export const SHOW_ERROR = `SHOW_ERROR`;

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

export const showError = error => ({
  type: SHOW_ERROR,
  error
});
