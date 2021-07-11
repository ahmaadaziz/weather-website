const request = require("request");

const weather = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=61b604e7168b476739dce7f3eeb3d2fb&query=${lat},${lon}&units=m`;

  request({ url, json: true }, (_err, _res, body) => {
    if (_err) {
      callback("Cannot connect to server");
    } else if (body.error) {
      callback("Unable to find location, Try another search");
    } else {
      callback(
        undefined,
        `It is currently ${body.current.temperature}°C along with a ${body.current.precip}% chance of rain`
      );
    }
  });
};

module.exports = weather;
