import React, { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "components/Generic";
import { closeModal } from "store/actions";
import modals from "./modals";
import {
  $Backdrop,
  $Container,
  $exitButtonStyle
} from "./ModalContainer.styled";

const ModalContainer = ({ closeModal, modalType }) => {
  const onClose = useCallback(
    e => {
      e.preventDefault();
      closeModal();
    },
    [closeModal]
  );
  const modal = useMemo(() => modals[modalType], [modalType]);
  return modalType ? (
    <$Backdrop>
      <$Container>
        <Button onClick={onClose} styles={$exitButtonStyle}>
          X
        </Button>
        {modal}
      </$Container>
    </$Backdrop>
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
  closeModal
};

export default memo(
  connect(
    null,
    mapDispatchToProps
  )(ModalContainer)
);
