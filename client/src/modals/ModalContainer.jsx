import React, { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { appActions } from "store/actions";
import { useHistory } from "react-router-dom";
import modals from "./modals";
import * as Styled from "./ModalContainer.styled";

const ModalContainer = ({ modalType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onClose = useCallback(
    e => {
      e.preventDefault();
      dispatch(appActions.closeModal());
      history.replace(`/`);
    },
    [dispatch, history]
  );
  const modal = useMemo(() => modals[modalType], [modalType]);
  return modalType ? (
    <Styled.Backdrop>
      <Styled.Container>
        <Styled.ExitButton onClick={onClose}>X</Styled.ExitButton>
        {modal}
      </Styled.Container>
    </Styled.Backdrop>
  ) : null;
};

ModalContainer.defaultProps = {
  modalType: null
};

ModalContainer.propTypes = {
  modalType: PropTypes.string
};

export default memo(ModalContainer);
