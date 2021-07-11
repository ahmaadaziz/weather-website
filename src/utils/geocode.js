const request = require("request");

const geocode = function (address, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYWhtYWRheml6IiwiYSI6ImNrcG52MGd4cjAzNnEycHBiODQwYTU0YjAifQ.xfd6xfvYnhC_AtV5hj6YBQ`;

  request({ url, json: true }, (_err, _res, body) => {
    if (_err) {
      callback("Unable to connect to server", undefined);
    } else if (body.message) {
      callback("Unable to find location - Due to invalid URl");
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      const coordinatesArray = body.features[0].center;
      callback(undefined, coordinatesArray);
    }
  });
};

module.exports = geocode;
