// import { Destination } from '../src/Destination';

class TripRepo {
  constructor(tripData) {
    this.id = tripData.id;
  }
}

// class DestinationRepo {
//   constructor(destinationData) {
//     this.destinations = destinationData;
//   } 
  
//   getDestinationById(id) {
//     const foundDestination = this.destinations.find(destination => destination.id === id);
//     return foundDestination;
//   }
// }

export { TripRepo }

// Date.now().toString();