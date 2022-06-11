class DestinationRepo {
  constructor(destinationData) {
    this.destinations = destinationData;
  } 
  getDestinationById(id) {
    const foundDestination = this.destinations.find(destination => destination.id === id);
    return foundDestination;
  }
}

export { DestinationRepo }