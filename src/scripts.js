// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// An example of how you tell webpack to use a CSS (SCSS) file

// Imports
import './css/styles.css';
import { requestApiData } from './api-calls.js';
import { TripRepo } from '../src/TripRepo';
import { TravelerRepo } from '../src/TravelerRepo';
import { DestinationRepo } from '../src/DestinationRepo'
const dayjs = require('dayjs');

// Query Selectors
const travelerGreeting = document.querySelector('#travelerGreeting');
const tripInfo = document.querySelector('#tripInfo');
const tripInfoButtons = document.querySelectorAll('#tripButton');

// Class Instances
let tripRepo, travelerRepo, destinationRepo, travelerTripRepo; 

// Global Variables
let travelerData, destinationData, tripData, 
travelerId, travelerTrips, matchedTrips;

// Functions
const getRandomTraveler = repo => {
  return Math.floor(Math.random() * repo.length + 1);
};

const retrieveApiData = () => {
  Promise.all([
    requestApiData('trips'),
    requestApiData('travelers'),
    requestApiData('destinations')
  ]).then(data => instantiateClasses(data));
};

const instantiateClasses = (data) => {
  tripData = data[0].trips;
  travelerData = data[1].travelers;
  destinationData = data[2].destinations;
  tripRepo = new TripRepo(tripData);
  travelerRepo = new TravelerRepo(travelerData);
  destinationRepo = new DestinationRepo(destinationData);
  tripRepo.destinations.destinations.splice(0, 5, destinationData);
  renderPageData()
};

const renderPageData = () => {
  welcomeTraveler();
  sortTravelerTrips();
  sumTripCostPerYear();
};

const welcomeTraveler = () => {
  travelerId = getRandomTraveler(travelerRepo.travelers)
  travelerGreeting.innerHTML = `Welcome ${travelerRepo.returnTravelerFirstName(travelerId)}! Would you like to plan a trip today?`
};

const sortTravelerTrips = () => {
  travelerTrips = tripRepo.trips.filter(trip => trip.userID === travelerId);
  travelerTripRepo = new TripRepo(travelerTrips);
  travelerTripRepo.getPastTrips()
  travelerTripRepo.getPresentTrips();
  travelerTripRepo.getFutureTrips();
  travelerTripRepo.getPendingTrips();
}

const createPastTripObjects = () => {
  sortTravelerTrips();
  let foundDestination;
  const pastTripInfo = travelerTripRepo.pastTrips.map((trip) => {
   foundDestination = destinationRepo.getDestinationById(trip.destinationID);
    return {
      startDate: dayjs(trip.date).toString().slice(0, 16),
      duration: trip.duration,
      destination: foundDestination.destination,
      image: foundDestination.image,
      alt: foundDestination.alt,
      travelers: trip.travelers,
      duration: trip.duration,
      estimatedLodgingCostPerDay: foundDestination.estimatedLodgingCostPerDay,
      estimatedFlightCostPerPerson: foundDestination.estimatedFlightCostPerPerson
    }
  })
  return pastTripInfo
};


const createFutureTripObjects = () => {
  sortTravelerTrips();
  let foundDestination;
  const futureTripInfo = travelerTripRepo.futureTrips.map((trip) => {
   foundDestination = destinationRepo.getDestinationById(trip.destinationID);
    return {
      startDate: dayjs(trip.date).toString().slice(0, 16),
      duration: trip.duration,
      destination: foundDestination.destination,
      image: foundDestination.image,
      alt: foundDestination.alt,
      travelers: trip.travelers,
      duration: trip.duration,
      estimatedLodgingCostPerDay: foundDestination.estimatedLodgingCostPerDay,
      estimatedFlightCostPerPerson: foundDestination.estimatedFlightCostPerPerson
    }
  })
  return futureTripInfo
};

const sumTripCostPerYear = () => {
  const pastAndFutureTrips = createPastTripObjects().concat(createFutureTripObjects());
  const userTripsThisYear = pastAndFutureTrips.filter(trip => trip.startDate.includes('2022'));
  const tripCostThisYearSum = userTripsThisYear.reduce((acc, trip) => {
    const baseTripCost = (trip.estimatedFlightCostPerPerson * trip.travelers) + (trip.estimatedLodgingCostPerDay * trip.duration);
    const travelAgentFee = baseTripCost * .10;
    const totalTripCost = baseTripCost + travelAgentFee;
    return acc + totalTripCost
  }, 0)
  return tripCostThisYearSum
}

const displayTripCostThisYear = () => {
  
}

// alt: "people standing inside a colosseum during the day"
// destination: "Rome, Italy"
// duration: 17
// estimatedFlightCostPerPerson: 650
// estimatedLodgingCostPerDay: 90
// image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
// startDate: "Sun, 22 May 2022"
// travelers: 4

const displayPastTrips = () => {
  const pastTrips = createPastTripObjects().forEach((trip) => {
    tripInfo.innerHTML += 
  `<div class="box-images">
    <img class="poster" src="${trip.image}"  alt="${trip.alt}">
  </div>
  <div class="box-name">
    <h4 class="recipeint-name">Destination: ${trip.destination}</h4>
    <p class="date">Start Date: ${trip.startDate}</p>
  </div>
  <div class="box-footer">
    <div>
      <h3 class="attachment-number" id="number">${trip.duration} Days</h3>
    </div>
  </div>` 
  })
  return pastTrips
};

// Event Listeners
window.addEventListener("load", retrieveApiData("load"));
tripInfoButtons[0].addEventListener('click', displayPastTrips);
// tripInfoButtons[1].addEventListener('click', displayPresentTrips());
// tripInfoButtons[2].addEventListener('click', displayUpcomingTrips());