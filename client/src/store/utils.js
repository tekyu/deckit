export const simpleState = (state, action) => {
	return {
		...state,
		...action
	};
};
