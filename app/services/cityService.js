const csvsync = require('csvsync');
const fs = require('fs');
const path = require('path');
const dir = path.resolve('app/db','cities.csv')
var csv = fs.readFileSync(dir);
var cities = csvsync.parse(csv ,{
  skipHeader: true,
  returnObject: true,
  headerKeys: ['city','lat','lng','country','iso2','admin','capital','population','population_proper'],
  delimiter: ',',
  trim: true
})

module.exports.findAllUrban = () =>{
  return cities.filter((city)=> {
    return city.population > 1000 && (city.population/city.population_proper > 1)
  })
}
