import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkAuth } from 'store/actions/user';
import dynamicSort from 'utils/dynamicSort';
import CardList from './CardList';
import Sort from './Sort/Sort';
import mockRooms from './mockRooms';

class Browse extends Component {
  state = {
    rooms: mockRooms
  };

  sortHandler = options => {
    const { sortBy } = options;
    console.log(sortBy);
    this.setState(() => {
      return { rooms: mockRooms.sort(dynamicSort(sortBy)) };
    });
  };

  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    return (
      <React.Fragment>
        <Sort handler={this.sortHandler} />
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
