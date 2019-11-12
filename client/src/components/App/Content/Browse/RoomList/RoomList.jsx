import React, { Component } from "react";
import PropTypes from "prop-types";
import RoomCard from "./RoomCard/RoomCard";
import * as styles from "./RoomList.module.scss";

// const CardList = ({ rooms }) => {
// 	const roomList = rooms.map(room => {
// 		return <RoomCard key={room.id} options={room} />;
// 	});
// 	return <div className={styles.container}>{roomList}</div>;
// };

// CardList.propTypes = {
// 	rooms: PropTypes.array.isRequired
// };

// export default CardList;

class CardList extends Component {
  state = {};

  render() {
    const { handler, rooms, isAnonymous } = this.props;
    if (!rooms) {
      return null;
    }
    const roomList = rooms.map(room => {
      return (
        <RoomCard
          key={room.id}
          options={room}
          handler={handler}
          isAnonymous={isAnonymous}
        />
      );
    });
    return <div className={styles.container}>{roomList}</div>;
  }
}

// const mapStateToProps = ({ auth, user }) => {
// 	return {
// 		auth,
// 		user
// 	};
// };

export default CardList;
