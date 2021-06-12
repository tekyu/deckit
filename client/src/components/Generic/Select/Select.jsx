import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import * as styles from "./Select.module.scss";

class Select extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      wrapperRef: null,
    };
  }

  componentDidMount() {
    document.addEventListener(`mousedown`, this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener(`mousedown`, this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.setState(() => ({
      wrapperRef: node,
    }));
  };

  handleClickOutside = ({ target }) => {
    const { state: { wrapperRef } } = this;
    if (!wrapperRef.contains(target)) {
      this.setState(() => ({
        show: false,
      }));
    }
  };

  hideShowDropdown = () => {
    this.setState((state) => ({
      show: !state.show,
    }));
  };

  changeSelection = (key) => {
    const { props: { handler } } = this;
    this.hideShowDropdown();
    handler(key);
  };

  render() {
    const { props: { options, selectedOption }, changeSelection, state: { show } } = this;
    const dropdown = (
      <div className={styles.dropdown}>
        <ul>
          {options.map((option) => {
            const { key, name } = option;
            if (key !== selectedOption) {
              return (
                <li
                  onClick={() => {
                    changeSelection(key);
                  }}
                  key={key}
                  name={name}
                >
                  {name}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    );
    return (
      <div className={styles.container} ref={this.setWrapperRef}>
        <div className={styles.display} onClick={this.hideShowDropdown}>
          {selectedOption}
        </div>
        {show ? dropdown : null}
      </div>
    );
  }
}

Select.propTypes = {
  handler: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.string.isRequired,
};

export default Select;
