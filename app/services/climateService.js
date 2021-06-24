const csvsync = require('csvsync');
const fs = require('fs');
const cityService = require('./cityService.js') 
const path = require('path');
const dir = path.resolve('app/db','climate.csv')
const csv = fs.readFileSync(dir);
const climateList = csvsync.parse(csv ,{
  skipHeader: true,
  returnObject: true,
  headerKeys: [
    'lng',
    'lat',
    'STATION_NAME',
    'CLIMATE_IDENTIFIER',
    'ID',
    'LOCAL_DATE',
    'PROVINCE_CODE',
    'LOCAL_YEAR',
    'LOCAL_MONTH',
    'LOCAL_DAY',
    'MEAN_TEMPERATURE',
    'MEAN_TEMPERATURE_FLAG',
    'MIN_TEMPERATURE',
    'MIN_TEMPERATURE_FLAG',
    'MAX_TEMPERATURE',
    'MAX_TEMPERATURE_FLAG',
    'TOTAL_PRECIPITATION',
    'TOTAL_PRECIPITATION_FLAG',
    'TOTAL_RAIN',
    'TOTAL_RAIN_FLAG',
    'TOTAL_SNOW',
    'TOTAL_SNOW_FLAG',
    'SNOW_ON_GROUND',
    'SNOW_ON_GROUND_FLAG',
    'DIRECTION_MAX_GUST',
    'DIRECTION_MAX_GUST_FLAG',
    'SPEED_MAX_GUST',
    'SPEED_MAX_GUST_FLAG',
    'COOLING_DEGREE_DAYS',
    'COOLING_DEGREE_DAYS_FLAG',
    'HEATING_DEGREE_DAYS',
    'HEATING_DEGREE_DAYS_FLAG',
    'MIN_REL_HUMIDITY',
    'MIN_REL_HUMIDITY_FLAG',
    'MAX_REL_HUMIDITY',
    'MAX_REL_HUMIDITY_FLAG'
  ],
  delimiter: ',',
  trim: true
})
// this is function I got from here https://www.geodatasource.com/developers/javascript
function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = Math.PI * lat1/180
  var radlat2 = Math.PI * lat2/180
  var theta = lon1-lon2
  var radtheta = Math.PI * theta/180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
      dist = 1;
  }
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
  if (unit=="K") { dist = dist * 1.609344 }
  if (unit=="N") { dist = dist * 0.8684 }
  return dist
}
function findShortestDistance(arr){
  var lowest = arr[0].dist;
  var ObjShortest = arr[0];
  for(var i= arr.length-1; i>=0; i--){
    var tmp = arr[i].dist;
    if (tmp < lowest) {
      lowest= tmp;
      ObjShortest = arr[i];
    }
  }
  return ObjShortest;
}
module.exports.findMedian = (arr) =>{
  var count = 0;
  var sum =0
  for(var i= arr.length-1; i>=0; i--){
    if (arr[i].mean !== ''){
      sum += parseFloat(arr[i].mean);
      count ++;
    }
  }
  
  if (count > 0){
    return sum / count
  }
  return 0
}
module.exports.getAllUrbanMeanByDate = (inputDate) =>{
  var urbanStationList = []
  var stationList = climateList.filter((row)=> {
    return row.LOCAL_DATE === inputDate
  })
  var urbanList = cityService.findAllUrban()
  if(stationList.length >0  && urbanList.length > 0){
    urbanList.forEach(urban => {
      var temp = []
      stationList.forEach((station)=> {
        var dist = distance(urban.lat, urban.lng, station.lat,station.lng,"K")
        temp.push({urbanName: urban.city, climateIdentifier: station.CLIMATE_IDENTIFIER, dist: dist, mean:station.MEAN_TEMPERATURE })
      })
      urbanStationList.push(findShortestDistance(temp))
    });
    return urbanStationList
  }
  return []
}
// var temp = getAllUrbanMeanByDate('2021-01-17 0:00')
// console.log(temp)
// module.exports.getAllStationByDate = (inputDate)=> {
//   return [];
// }