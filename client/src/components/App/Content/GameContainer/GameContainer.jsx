import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { joinRoom, openModal } from "store/actions";
import { ANONYMOUS_MODAL } from "components/Modals";
import * as Styled from "./GameContainer.styled";
import SidePanel from "./SidePanel/SidePanel";

const GameContainer = ({
  match: {
    params: { roomId }
  },
  userId,
  username
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!username) {
      dispatch(openModal({ modalType: ANONYMOUS_MODAL }));
    } else {
      dispatch(joinRoom({ roomId, userId, username }));
    }
  }, [dispatch, roomId, userId, username]);
  return (
    <Styled.Container>
      {/* {GameComponent && <GameComponent />} */}
      <SidePanel />
    </Styled.Container>
  );
};

GameContainer.defaultProps = {
  username: ``
};

GameContainer.propTypes = {
  isInitialized: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ roomId: PropTypes.string.isRequired })
  }),
  userId: PropTypes.string.isRequired,
  username: PropTypes.string
};

const mapStateToProps = ({ user: { userId, username } }) => {
  return {
    userId,
    username
  };
};

export default connect(mapStateToProps)(withRouter(GameContainer));
