class TripRepo {
  constructor(tripRepoData) {
    this.trips = tripRepoData;
    this.dates = tripRepoData.map(trip => trip.date);
  }

  convertTripDates() {
    let convertedTripDates = [ ]
    this.dates.forEach((date) => {
      let convertedDates = new Date(date).getTime();
      convertedTripDates.push(convertedDates);
    });
    return convertedTripDates;
  };

  getPastTrips() {
    console.log(this.convertTripDates())
    const pastTrip = this.trips.filter((trip) => {

    })
  }
}

export { TripRepo }

