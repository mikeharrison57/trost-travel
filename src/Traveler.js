class TravelerRepo {
  constructor(travelerRepoData) {
    this.travelers = travelerRepoData;
    // this.id = travelerRepoData[0].id;
    console.log(travelerRepoData)

  }
  getTravelerId() {
    return this.id;
  }
};

export { TravelerRepo }