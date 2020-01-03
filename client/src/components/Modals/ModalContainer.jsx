import React, { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "components/Generic";
import { closeModal } from "store/actions";
import { modals } from ".";
import * as Styled from "./ModalContainer.styled";

const ModalContainer = ({ closeModal, modalType }) => {
  const onClose = useCallback(() => {
    closeModal();
  }, [closeModal]);
  const modal = useMemo(() => modals[modalType], [modalType]);
  return modalType ? (
    <Styled.Backdrop>
      <Styled.Container>
        <Button onClick={onClose} styles={Styled.ExitButton}>
          X
        </Button>
        <Styled.Icon />
        <Styled.Header>
          <h2>{modal.title}</h2>
          <p>Lets have fun!</p>
        </Styled.Header>
        {modal.component}
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
  closeModal
};

export default memo(connect(null, mapDispatchToProps)(ModalContainer));
