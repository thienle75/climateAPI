class Climate {
  static findById(name, cb) {
      setImmediate(() => {
          cb(null, new Climate(id));
      });
  }

  constructor(id,name,lat, lng,population, populationProper) {
      this.id = id;
      this.name = name;
      this.lat = lat;
      this.lng = lng;
      this.population = population;
      this.populationProper = populationProper;
  }
}

module.exports = Climate;