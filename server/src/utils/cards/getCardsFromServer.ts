import { request } from "express";

export default function() {
	return new Promise((resolve, reject) => {
		request(process.env.CARDS_ADDRESS", function(
			error,
			response,
			body
		) {
			// console.log("error:", error); // Print the error if one occurred and handle it
			// console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
			error ? reject(error) : resolve(JSON.parse(body));
		});
	});
};