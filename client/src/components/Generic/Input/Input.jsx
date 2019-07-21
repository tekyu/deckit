import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Input extends PureComponent {
  handleChange = event => {
    const { handler } = this.props;
    handler(event.target.value);
  };

  render() {
    const { text, value } = this.props;
    return (
      <input
        type="text"
        onChange={this.handleChange}
        placeholder={text}
        value={value}
      />
    );
  }
}

Input.propTypes = {
  handler: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Input;
