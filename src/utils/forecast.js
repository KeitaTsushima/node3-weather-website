const request = require("request");

const forecast = (lon, lat, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=9b628471da8982f94b7e5597e9cb6d87&query=${lon},${lat}&units=f`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to weather service", undefined);
		} else if (body.error) {
			callback("Unable to find location", undefined);
		} else {
			const obj = body.current
			const weather_desc = obj.weather_descriptions[0];
			const {temperature: temperature_outside, feelslike: temperature_feelslike} = obj
			const data = `${weather_desc}. It's currently ${temperature_outside} degrees outside. It feels like ${temperature_feelslike} outside.`;
			callback(undefined, data);
		}
	});
};

module.exports = forecast
