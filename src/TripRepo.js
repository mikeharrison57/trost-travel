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
    this.pastTrips = filteredPastTrips;
    return this.pastTrips;
  }

  getPresentTrips() {
    let today = dayjs().format('YYYY-MM-DD');
    let filteredPresentTrips = this.convertTripDates().filter(trip => trip.date === today);
    this.presentTrips = filteredPresentTrips;
    return this.presentTrips;
  }

  getFutureTrips() {
    let today = dayjs().format('YYYY-MM-DD');
    let filteredFutureTrips = this.convertTripDates().filter(trip => trip.date > today);
    this.futureTrips = filteredFutureTrips;
    console.log(this.futureTrips)
    return this.futureTrips;
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

