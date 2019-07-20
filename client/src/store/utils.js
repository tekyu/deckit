const simpleState = (state, data) => {
  return {
    ...state,
    ...data
  };
};

export default simpleState;
