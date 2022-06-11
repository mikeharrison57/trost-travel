class TravelerRepo {
  constructor(travelerRepoData) {
    this.travelers = travelerRepoData;
    // console.log(travelerRepoData)
  }

  getTravelerById(id) {
    const foundTraveler = this.travelers.find(traveler => traveler.id === id);
    return foundTraveler;
  }
  
  returnTravelerFirstName(id) {
    const travelerName = this.getTravelerById(id).name.split(' ');
    return travelerName[0];
  }
};

export { TravelerRepo }