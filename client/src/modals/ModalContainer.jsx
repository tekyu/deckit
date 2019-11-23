import React, { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { closeModal } from "store/actions";
import * as styles from "./ModalContainer.module.scss";
import modals from "./modals";

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
    <div className={styles.backdrop}>
      <div className={styles.container}>
        <div onClick={onClose} className={styles.close} />
        <div className={styles.content}>{modal}</div>
      </div>
    </div>
  ) : null;
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
