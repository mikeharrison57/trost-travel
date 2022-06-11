const dayjs = require('dayjs');

class TripRepo {
  constructor(tripRepoData) {
    this.trips = tripRepoData;
    this.pastTrips = [];
    this.presentTrips = [];
    this.futureTrips = [];
    this.pendingTrips = [];
  }

  convertTripDates() {
    let newDateFormatTrips = []
    this.trips.forEach((trip) => {
      let convertedDates = dayjs(trip.date).format();
      let slicedConDates = convertedDates.slice(0, 10);
      trip.date = slicedConDates;
      newDateFormatTrips.push(trip)
    });
    return newDateFormatTrips
  };

  getPastTrips() {
    let today = dayjs().format('YYYY-MM-DD');
    let filteredPastTrips = this.convertTripDates().filter(trip => trip.date < today);
    this.pastTrips = filteredPastTrips
    console.log(this.pastTrips)
    return this.pastTrips;
  }

  // organizeTrips() {
  //   let today = dayjs().format('YYYY-MM-DD');
  //   this.convertTripDates().forEach((trip) => {
  //     if (trip.date < today) {
  //       return this.pastTrips.push(trip);
  //     } else if (trip.date === today) {
  //       return this.presentTrips.push(trip);
  //     } else if (trip.date > today) {
  //       return this.futureTrips.push(trip);
  //     }
  //   })
  // }
}

export { TripRepo }

