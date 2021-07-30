////////////////////////// fetchMyIP
// const { fetchMyIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

//////////////////////////// fetchCoordsByIP
// const { fetchCoordsByIp } = require('./iss');

// fetchCoordsByIp('198.166.81.235', (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned coordinates:', coordinates);
// });

//////////////////////////// fetchISSFlyOverTimes
// const { fetchISSFlyOverTimes } = require('./iss');

// fetchISSFlyOverTimes( { latitude: 51.1391, longitude: -114.2002 }, (error, flyOverTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned fly over times:', flyOverTimes);
// });

//////////////////////////// nextISSTimesForMyLocation
const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const times of passTimes) {
    const date = new Date(0);
    date.setUTCSeconds(times.risetime);
    console.log(`Next pass at ${date} for ${times.duration} seconds!`);
  };
};
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});