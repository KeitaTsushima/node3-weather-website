const request = require("request");

const geocode = (address, callback) => {
	const options = {
		url: "http://api.positionstack.com/v1/forward",
		qs: {
			access_key: "a4094a47110f5d7f6e7cb76ddf79a3fd",
			query: address,
			output: "json",
			limit: 1,
		},
	};

	request(options, (error, { body }) => {
		const parsedBody = JSON.parse(body);
		if (error) {
			callback("Unable to connect to location service", undefined);
		} else if (!parsedBody.data || parsedBody.data.length === 0) {
			callback("Unable to find location", undefined);
		} else {
			const { label: location, latitude, longitude } = parsedBody.data[0];
			callback(undefined, {
				location,
				latitude,
				longitude,
			});
		}
	});
};

module.exports = geocode;
