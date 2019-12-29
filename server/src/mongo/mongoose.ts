import mongoose from "mongoose";

import chalk from "chalk";
const Mongoose = () => {
	// Create the database connection
	mongoose.connect(process.env.DEVDB_CONN, { useNewUrlParser: true, useUnifiedTopology: true });
	// CONNECTION EVENTS
	// When successfully connected
	mongoose.connection.on("connected", function() {
		console.log(
			chalk.black.bgMagenta(
				`Mongoose default connection open to ${process.env.DB_ADDRESS}`
			)
		);
	});
};

export default Mongoose;
