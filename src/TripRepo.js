const dayjs = require('dayjs');

class TripRepo {
  constructor(tripRepoData) {
    this.trips = tripRepoData;
    this.dates = tripRepoData.map(trip => trip.date);
    this.pastTrips = [];
    this.presentTrips = [];
    this.futureTrips = [];
  }

  convertTripDates() {
    let newDateFormatTrips = []
    this.trips.forEach((trip) => {
      let convertedDates = dayjs(trip.date).format();
      let slicedConDates = convertedDates.slice(0, 10);
      trip.date = slicedConDates;
      newDateFormatTrips.push(trip)
    });
    console.log(newDateFormatTrips)
    return newDateFormatTrips
  };

  getPastTrips() {
   

  }
}

export { TripRepo }

