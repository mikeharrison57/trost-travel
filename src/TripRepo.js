import { DestinationRepo } from '../src/DestinationRepo';
import { destinations } from '../src/data/Destination-sample-data';
const dayjs = require('dayjs');

class TripRepo {
  constructor(tripRepoData, destinationRepoData) {
    this.trips = tripRepoData;
    this.pastTrips = [];
    this.presentTrips = [];
    this.futureTrips = [];
    this.pendingTrips = [];
    this.destinations = new DestinationRepo([
      destinations[0], 
      destinations[1], 
      destinations[2],
      destinations[3], 
      destinations[4]
    ]);
    // console.log(this.destinations);
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
    return this.futureTrips;
  }


  getPendingTrips() {
    let filteredPendingTrips = this.convertTripDates().filter(trip => trip.status === 'pending');
    this.pendingTrips = filteredPendingTrips;
    console.log(this.pendingTrips)
    return this.pendingTrips;
  }

  // calculateTripCost() {

  // }

  
}

export { TripRepo }

