class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
  }
  getTravelerId() {
    return this.id;
  }
};



export { Traveler }