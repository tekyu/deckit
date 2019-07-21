import React, { Component } from 'react';
import Select from 'components/Generic/Select';
import * as styles from './Sort.module.scss';
import sortFields from './sortFields';

class Sort extends Component {
  state = {
    fields: sortFields,
    sortBy: sortFields[0].fieldName
  };

  changeSortHandler = sortField => {
    this.setState(() => {
      return {
        sortBy: sortField
      };
    });
  };

  render() {
    const { fields, sortBy } = this.state;
    return (
      <div className={styles.container}>
        <label>Sort by </label>
        <Select
          handler={this.changeSortHandler}
          selectedOption={sortBy}
          keys={fields.map(key => key.fieldName)}
        />
        <div className={styles.search}>
          {this.state.fields.find(
            element => element.fieldName === this.state.sortBy
          ).searchable && (
            <input type="text" placeholder={`Search by ${this.state.sortBy}`} />
          )}
        </div>
      </div>
    );
  }
}

export default Sort;
