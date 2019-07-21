import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkAuth } from 'store/actions/user';
import CardList from './CardList';
import Sort from './Sort/Sort';

class Browse extends Component {
  state = {
    rooms: [
      {
        id: '123',
        name: 'WRoom 1',
        createdBy: 'tekoy',
        createdById: '345',
        createdAt: '1541888514131',
        playersCurrent: '6',
        playersMax: '10',
        isPublic: true,
        gameCode: 'd',
        gameOptions: {
          decks: ['standard']
        }
      },
      {
        id: '1234',
        name: 'Room 2',
        createdBy: 'rimyi',
        createdById: '345',
        createdAt: '1541888514131',
        playersCurrent: '3',
        playersMax: '10',
        isPublic: false,
        gameCode: 'd',
        gameOptions: {
          decks: ['wholesome', 'countries']
        }
      },
      {
        id: '12345',
        name: 'Room 3',
        createdBy: 'rimyi',
        createdById: '345',
        createdAt: '1541888514131',
        playersCurrent: '3',
        playersMax: '10',
        isPublic: true,
        gameCode: 'k',
        gameOptions: {
          decks: ['wholesome', 'countries']
        }
      }
    ]
  };

  sortHandler() {}

  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    return (
      <React.Fragment>
        <Sort />
        <CardList rooms={this.state.rooms} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ auth, user }) => {
  return {
    auth,
    user
  };
};

const mapDispatchToProps = {
  checkAuth
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browse);
