import React, { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { appActions } from "store/actions";
import { useHistory } from "react-router-dom";
import modals from "./modals";
import * as Styled from "./ModalContainer.styled";

const ModalContainer = ({ closeModal, modalType }) => {
  const history = useHistory();
  const onClose = useCallback(
    e => {
      e.preventDefault();
      closeModal();
      history.replace(`/`);
    },
    [closeModal, history]
  );
  const modal = useMemo(() => modals[modalType], [modalType]);
  return modalType ? (
    <Styled.Backdrop>
      <Styled.Container>
        <Styled.ExitButton onClick={onClose} styles={Styled.ExitButton}>
          X
        </Styled.ExitButton>
        {modal}
      </Styled.Container>
    </Styled.Backdrop>
  ) : null;
};

ModalContainer.defaultProps = {
  modalType: null
};

ModalContainer.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalType: PropTypes.string
};

const mapDispatchToProps = {
  closeModal: appActions.closeModal
};

export default memo(
  connect(
    null,
    mapDispatchToProps
  )(ModalContainer)
);
