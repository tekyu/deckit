import React, { Component } from 'react';
import Input from 'components/Generic/Input';
import Select from 'components/Generic/Select';
import * as styles from './Sort.module.scss';
import sortFields from './sortFields';

class Sort extends Component {
  state = {
    fields: sortFields,
    searchPhrase: '',
    sortBy: sortFields[0].fieldName,
    sortByDisplayName: sortFields[0].displayName
  };

  changeSearchHandler = event => {
    const { value } = event.target;
    this.setState(() => {
      return {
        searchPhrase: value
      };
    });
  };

  changeSortHandler = name => {
    this.setState(state => {
      return {
        searchPhrase: '',
        sortBy: name,
        sortByDisplayName: state.fields.find(
          element => element.fieldName === name
        ).displayName
      };
    });
  };

  render() {
    const { fields, searchPhrase, sortBy, sortByDisplayName } = this.state;
    return (
      <div className={styles.container}>
        <label>Sort by </label>
        <Select
          handler={this.changeSortHandler}
          selectedOption={sortByDisplayName}
          options={fields.map(field => {
            const option = { key: field.fieldName, name: field.displayName };
            return option;
          })}
        />
        <div className={styles.search}>
          {fields.find(element => element.fieldName === sortBy).searchable && (
            <Input
              handler={this.changeSearchHandler}
              name={sortBy}
              value={searchPhrase}
              text={`Search by ${sortByDisplayName}`}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Sort;
