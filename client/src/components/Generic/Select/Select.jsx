import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import * as styles from "./Select.module.scss";

class Select extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      wrapperRef: null
    };
  }

  componentDidMount() {
    document.addEventListener(`mousedown`, this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener(`mousedown`, this.handleClickOutside);
  }

  setWrapperRef = node => {
    this.setState(() => {
      return {
        wrapperRef: node
      };
    });
  };

  handleClickOutside = event => {
    if (!this.state.wrapperRef.contains(event.target)) {
      this.setState(() => {
        return {
          show: false
        };
      });
    }
  };

  hideShowDropdown = () => {
    this.setState(state => {
      return {
        show: !state.show
      };
    });
  };

  changeSelection = key => {
    this.hideShowDropdown();
    this.props.handler(key);
  };

  render() {
    const { options, selectedOption } = this.props;
    const dropdown = (
      <div className={styles.dropdown}>
        <ul>
          {options.map(option => {
            const { key, name } = option;
            if (key !== this.props.selectedOption) {
              return (
                <li
                  onClick={() => {
                    this.changeSelection(key);
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
        {this.state.show ? dropdown : null}
      </div>
    );
  }
}

Select.propTypes = {
  handler: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.string.isRequired
};

export default Select;
