import React, { Component } from 'react';
import { connect } from 'react-redux';
import sillyname from 'sillyname';
import { inputOnChangeHandler } from 'utils';
import { listener, emitter } from 'store/actions/socket';
import { CREATE_ROOM } from 'store/actions/socketCreators';
import { withRouter } from 'react-router-dom';
import * as styles from './ChatPanel.module.scss';
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */
class ChatPanel extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    mock: [
      {
        id: '12qw34',
        owner: '5qw43',
        ownerName: 'blabla',
        timestamp: 1573382208916,
        message: 'blabla'
      },
      {
        id: '12q34',
        owner: '543qwe',
        ownerName: 'blabla',
        timestamp: 1573382218917,
        message: 'blabla'
      },
      {
        id: '12d34',
        owner: '543',
        ownerName: 'blabla',
        timestamp: 1573382228918,
        message: 'blabla'
      },
      {
        id: '123g4',
        owner: '543',
        ownerName: 'blabla',
        timestamp: 1573382238916,
        message: 'blabla'
      },
      {
        id: '123h4',
        owner: '543',
        ownerName: 'blabla',
        timestamp: 1573382248916,
        message: 'blabla'
      },
      {
        id: '123cc4',
        owner: '5qqe43',
        ownerName: 'blabla',
        timestamp: 1573382258916,
        message: 'blabla'
      },
      {
        id: '12ss34',
        owner: '543',
        ownerName: 'blabla',
        timestamp: 1573382268916,
        message: 'blabla'
      },
      {
        id: '123sa4',
        owner: '5423',
        ownerName: 'blabla1',
        timestamp: 1573382278916,
        message: 'blabla'
      },
      {
        id: '123gdf4',
        owner: '567543',
        ownerName: 'blabla2',
        timestamp: 1573382288916,
        message: 'blabla'
      },
      {
        id: '123ytht4',
        owner: '234543', // owner should be an object, returned from server; reduce computing on front side
        ownerName: 'blabla3',
        timestamp: 1573382298916,
        message: 'blablanbvdesr dfdgdgdfdfd fdsfdsfdsfdf sfsdfsdfsdfs'
      }
    ]
  };

  get chatElement() {
    return null;
  }

  render() {
    return <div className={styles.container}>chat</div>;
  }
}

const mapStateToProps = ({ user: { user } }) => {
  return {
    user
  };
};

const mapDispatchToProps = { emitter, listener };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPanel);
