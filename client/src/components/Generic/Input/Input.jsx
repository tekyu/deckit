import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class Input extends PureComponent {
  handleChange = event => {
    const { handler } = this.props;
    handler(event);
  };

  render() {
    const { name, text, value } = this.props;
    return (
      <input
        type="text"
        name={name}
        onChange={this.handleChange}
        placeholder={text}
        value={value}
      />
    );
  }
}

Input.propTypes = {
  handler: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Input;
