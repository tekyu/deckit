import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Input from "components/Generic/Input/Input";
import Select from "components/Generic/Select/Select";
import * as styles from "./Sort.module.scss";
import sortFields from "./sortFields";

const Sort = ({ sortHandler }) => {
  const [searchPhrase, setSearchPhrase] = useState(``);
  const [sortBy, setSortBy] = useState(sortFields[0].fieldName);
  const [sortByDisplayName, setSortByDisplayName] = useState(
    sortFields[0].displayName
  );
  useEffect(() => {
    sortHandler({ searchPhrase, sortBy });
  }, [searchPhrase, sortBy, sortHandler]);
  const changeSortHandler = useCallback(newSortBy => {
    setSearchPhrase(``);
    setSortBy(newSortBy);
    setSortByDisplayName(
      sortFields.find(element => element.fieldName === newSortBy).displayName
    );
  }, []);
  const changeSearchHandler = useCallback(e => {
    setSearchPhrase(e.target.value);
  }, []);
  const options = sortFields.map(field => ({
    key: field.fieldName,
    name: field.displayName
  }));
  return (
    <div className={styles.container}>
      <span>Sort by </span>
      <Select
        handler={changeSortHandler}
        selectedOption={sortByDisplayName}
        options={options}
      />
      <div className={styles.search}>
        {sortFields.find(element => element.fieldName === sortBy)
          .searchable && (
          <Input
            handler={changeSearchHandler}
            name={sortBy}
            value={searchPhrase}
            text={`Search by ${sortByDisplayName}`}
          />
        )}
      </div>
    </div>
  );
};

Sort.propTypes = {
  sortHandler: PropTypes.func.isRequired
};

export default Sort;
