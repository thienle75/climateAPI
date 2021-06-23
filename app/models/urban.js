class Urban {

  static findById(id, cb) {
      setImmediate(() => {
          cb(null, new Urban(id));
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
  getName() {
    return this.name;
  }
}

module.exports = Urban;