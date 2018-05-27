import React, { Component } from "react";

class createRoom extends Component {
  state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    let toggleElement = null;

    if (show) {
        toggleElement = (
        <div className="create-room-modal">
            <div className="create-room-close" onClick={this.hideModal}></div>
            <section className="modal-main">
            </section>
        </div>
        )
    }

    return (
        
    );
  }
}

export default createRoom;