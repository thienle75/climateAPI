var csvsync = require('csvsync');
var fs = require('fs');
var cityService = require('./cityService.js') 
var csv = fs.readFileSync('../db/climate.csv');
var climateList = csvsync.parse(csv ,{
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

var temp = cityService.findAllUrban()
console.log(temp)