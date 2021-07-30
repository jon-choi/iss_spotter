const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    let myIp = data.ip;

    callback(null, myIp);
  });
};

const fetchCoordsByIp = function(ip, callback) {
  request('https://freegeoip.app/json/' + ip, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    let coordinates = {
      latitude: data.latitude,
      longitude: data.longitude
    };
    callback(null, coordinates);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching fly over times. Response ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    let flyOver = data.response;
    callback(null, flyOver)
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {

    fetchCoordsByIp(ip, (error, coords) => {

      fetchISSFlyOverTimes(coords, (error, flyTimes) => {
        
        callback(null, flyTimes);
      });
    });
  });
};
module.exports = { 
  fetchMyIP, 
  fetchCoordsByIp,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation };