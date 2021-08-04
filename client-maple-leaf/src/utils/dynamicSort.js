const dynamicSort = (property, reverse = false) => {
  let sortOrder = 1;
  if (reverse) {
    sortOrder = -1;
  }
  return (a, b) => {
    let result;
    if (a[property] < b[property]) {
      result = -1;
    } else if (a[property] > b[property]) {
      result = 1;
    } else {
      result = 0;
    }
    return result * sortOrder;
  };
};

export default dynamicSort;
