// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// An example of how you tell webpack to use a CSS (SCSS) file

// Imports
import './css/styles.css';
import { requestApiData, postNewTrip } from './api-calls.js';
import { TripRepo } from '../src/TripRepo';
import { TravelerRepo } from '../src/TravelerRepo';
import { DestinationRepo } from '../src/DestinationRepo'
const dayjs = require('dayjs');

// Query Selectors
const travelerGreeting = document.querySelector('#travelerGreeting');
const tripCostThisYear = document.querySelector('#tripCostThisYear');
const pastTripDisplay = document.querySelector('#pastTripInfo');
const presentTripDisplay = document.querySelector('#presentTripInfo');
const pendingTripDisplay = document.querySelector('#pendingTripInfo');
const futureTripDisplay = document.querySelector('#futureTripInfo');
const destinationSelector = document.querySelector('#destinationSelect');
// const formInputs = document.querySelectorAll('input');
const submitButton = document.querySelector('#confirmBtn');
const reviewTripButton = document.querySelector('#reviewTripBtn');

// Class Instances
let tripRepo, travelerRepo, destinationRepo, travelerTripRepo; 

// Global Variables
let travelerData, destinationData, tripData, 
travelerId, travelerTrips, matchedTrips, newUserTrip;

// Functions
const getRandomId = repo => {
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
  renderPageData()
};

const createPostObjects = form => {
  
  return {
    id: parseInt(tripRepo.trips.length + 1),
    userID: parseInt(travelerId),
    destinationID: parseInt(form[1].value),
    travelers: parseInt(form[3].value),
    date: dayjs(form[0].value).format('YYYY/MM/DD'),
    duration: parseInt(form[2].value),
    status: "pending",
    suggestedActivities: [ ]
  }
}

const postTripData = event => {
  event.preventDefault()
  let postObject = createPostObjects(event.target.form);
  console.log(postObject)
  postNewTrip(postObject).then(() => {
    pastTripDisplay.innerHTML = ''
    presentTripDisplay.innerHTML = ''
    pendingTripDisplay.innerHTML = ''
    futureTripDisplay.innerHTML = ''
    retrieveApiData(travelerId)
  })
}

const renderPageData = () => {
  welcomeTraveler();
  sortTravelerTrips();
  sumTripCostThisYear();
  displayTripCostThisYear();
  displayPastTrips();
  displayPendingTrips();
  displayUpcomingTrips();
  setUpDestinationSelect();
};

const welcomeTraveler = () => {
  travelerId = 44
  travelerGreeting.innerHTML = `Welcome ${travelerRepo.returnTravelerFirstName(travelerId)}! Would you like to plan a trip today?`
};

const sortTravelerTrips = () => {
  travelerTrips = tripRepo.trips.filter(trip => trip.userID === travelerId)
  travelerTripRepo = new TripRepo(travelerTrips);
  travelerTripRepo.getPastTrips();
  travelerTripRepo.getPresentTrips();
  travelerTripRepo.getPendingTrips()
  travelerTripRepo.getFutureTrips();
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
      status: trip.status,
      estimatedLodgingCostPerDay: foundDestination.estimatedLodgingCostPerDay,
      estimatedFlightCostPerPerson: foundDestination.estimatedFlightCostPerPerson
    }
  })
  return pastTripInfo
};

const createPendingTripObjects = () => {
  sortTravelerTrips();
  let foundDestination;
  const pendingTripInfo = travelerTripRepo.pendingTrips.map((trip) => {
   foundDestination = destinationRepo.getDestinationById(trip.destinationID);
    return {
      startDate: dayjs(trip.date).toString().slice(0, 16),
      duration: trip.duration,
      destination: foundDestination.destination,
      image: foundDestination.image,
      alt: foundDestination.alt,
      travelers: trip.travelers,
      duration: trip.duration,
      status: trip.status,
      estimatedLodgingCostPerDay: foundDestination.estimatedLodgingCostPerDay,
      estimatedFlightCostPerPerson: foundDestination.estimatedFlightCostPerPerson
    }
  })
  return pendingTripInfo
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
      status: trip.status,
      estimatedLodgingCostPerDay: foundDestination.estimatedLodgingCostPerDay,
      estimatedFlightCostPerPerson: foundDestination.estimatedFlightCostPerPerson
    }
  })
  return futureTripInfo
};

const sumTripCostThisYear = () => {
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
  tripCostThisYear.innerHTML = `You've spent $${sumTripCostThisYear()} on trips this year!`
}

const displayPastTrips = () => {
  const pastTrips = createPastTripObjects().forEach((trip) => {
    pastTripDisplay.innerHTML += 
  `<div class="box-images">
    <img class="poster" src="${trip.image}"  alt="${trip.alt}">
  </div>
  <div class="box-name">
    <h3 class="recipeint-name">Destination: ${trip.destination}</h3>
    <p class="date">Start Date: ${trip.startDate}</p>
    <p class="date">${trip.duration} Days</p>
  </div>
  <div class="box-footer">
    <div>
      <h4 class="attachment-number" id="number">Status: ${trip.status}</h4>
    </div>
  </div>` 
  })
  return pastTrips
};

const displayPendingTrips = () => {
  const pendingTrips = createPendingTripObjects().forEach((trip) => {
    pendingTripDisplay.innerHTML +=
    `<div class="box-images">
    <img class="poster" src="${trip.image}"  alt="${trip.alt}">
  </div>
  <div class="box-name">
    <h3 class="recipeint-name">Destination: ${trip.destination}</h3>
    <p class="date">Start Date: ${trip.startDate}</p>
    <p class="date">${trip.duration} Days</p>
  </div>
  <div class="box-footer">
    <div>
      <h4 class="attachment-number" id="number">Status: ${trip.status}</h4>
    </div>
  </div>` 
  })
  return pendingTrips
};


const displayUpcomingTrips = () => {
  const futureTrips = createFutureTripObjects().forEach((trip) => {
    futureTripDisplay.innerHTML +=
    `<div class="box-images">
    <img class="poster" src="${trip.image}"  alt="${trip.alt}">
    </div>
    <div class="box-name">
    <h3 class="recipeint-name">Destination: ${trip.destination}</h3>
    <p class="date">Start Date: ${trip.startDate}</p>
    <p class="date">${trip.duration} Days</p>
    </div>
    <div class="box-footer">
    <div>
    <h4 class="attachment-number" id="number">Status: ${trip.status}</h4>
    </div>
    </div>` 
  })
  return futureTrips
};

const setUpDestinationSelect = () => {
  destinationRepo.destinations.forEach((destination) => {
    destinationSelector.innerHTML += `<option value="${destination.id}">${destination.destination}</option>`;
  })
};

/* <option value="${destination.destinationID}">${destination.destination}</option>` */

// Event Listeners
window.addEventListener('load', retrieveApiData("load"));
submitButton.addEventListener('click', postTripData);
