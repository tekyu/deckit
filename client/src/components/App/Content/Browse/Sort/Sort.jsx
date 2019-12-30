import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Select, TextInput } from "components/Generic";
import * as Styled from "./Sort.styled";
import sortFields from "./sortFields";

const Sort = ({ sortHandler }) => {
  const [searchPhrase, setSearchPhrase] = useState(``);
  const [sortBy, setSortBy] = useState(sortFields[0]);
  useEffect(() => {
    sortHandler({ searchPhrase, sortBy });
  }, [searchPhrase, sortBy, sortHandler]);
  const changeSortHandler = useCallback(sortById => {
    setSearchPhrase(``);
    const newSortBy = sortFields.find(
      element => element.fieldName === sortById
    );
    setSortBy(newSortBy);
  }, []);
  const changeSearchHandler = useCallback(newSearchPhrase => {
    setSearchPhrase(newSearchPhrase);
  }, []);
  const options = sortFields.map(field => ({
    id: field.fieldName,
    name: field.displayName
  }));
  return (
    <Styled.Container>
      <span>Sort by </span>
      <Select
        handler={changeSortHandler}
        selected={sortBy.fieldName}
        options={options}
      />
      <div>
        {
          <TextInput
            disabled={
              !sortFields.find(
                element => element.fieldName === sortBy.fieldName
              ).searchable
            }
            id="filterBy"
            name="Search"
            onChange={changeSearchHandler}
            value={searchPhrase}
          />
        }
      </div>
    </Styled.Container>
  );
};

Sort.propTypes = {
  sortHandler: PropTypes.func.isRequired
};

export default Sort;
