export const simpleState = (state, data) => {
	console.log("simpleState", state, data);
	return {
		...state,
		...data
	};
};
