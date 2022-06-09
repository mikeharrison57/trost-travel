class Traveler {
  constructor(travelerData) {
    console.log(travelerData)
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
  }
}



export { Traveler }