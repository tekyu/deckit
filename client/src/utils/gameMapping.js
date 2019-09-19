export const gameMapping = {
	d: "Deckit",
	k: "Karcianka"
};

export const listGameMapping = () => {
	return Object.values(gameMapping);
};

export const getGameMapping = game => {
	if (!gameMapping[game]) {
		throw Error(`Game ${game} is not defined within mapping`);
	}
	return gameMapping[game];
};
// export  getGameMapping;
