import { DestinationRepo } from '../src/DestinationRepo';
import { destinations } from '../src/data/Destination-sample-data';
const dayjs = require('dayjs');

class TripRepo {
  constructor(tripRepoData) {
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
  }

  convertTripDates() {
    let newDateFormatTrips = []
    this.trips.forEach((trip) => {
      let splitDates = trip.date.split('/');
      let joinedDates = splitDates.join('-');
      trip.date = joinedDates;
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
    return this.pendingTrips;
  }

  // sortTrips() {
  //   getPastTrips();
  //   getPresentTrips();
  //   getFutureTrips();
  //   getPendingTrips();
  //   return 
  // }

  calculateTripCost(id) {
    const foundDestination = this.destinations.getDestinationById(id);
    const foundTrip = this.trips.find(trip => trip.destinationID === id)
    let lodegingCosts = foundTrip.duration * foundDestination.estimatedLodgingCostPerDay;
    let flightCosts = foundTrip.travelers * foundDestination.estimatedFlightCostPerPerson;
    let baseTripCost = flightCosts += lodegingCosts;
    let travelAgentFee = baseTripCost * .10;
    let totalTripCost = baseTripCost += travelAgentFee;
    return totalTripCost;
  }
}

export { TripRepo }

