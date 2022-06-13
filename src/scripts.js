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
let travelerData, destinationData, tripData, travelerId;

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
  renderPageData()
}

const renderPageData = () => {
  welcomeTraveler();
  sortTravelerTrips();
  // displayPastTrips();
}

const welcomeTraveler = () => {
  travelerId = getRandomTraveler(travelerRepo.travelers)
  travelerGreeting.innerHTML = `Welcome ${travelerRepo.returnTravelerFirstName(travelerId)}! Would you like to plan a trip today?`
}

const sortTravelerTrips = () => {
  let travelerTrips = tripRepo.trips.filter(trip => trip.userID === travelerId);
  let foundDestination;
  
  const newTripArray = travelerTrips.map((trip) => {
   foundDestination = destinationRepo.getDestinationById(trip.destinationID);
    return {
      startDate: dayjs(trip.date).toString().slice(0, 16),
      duration: trip.duration,
      destination: foundDestination.destination,
      image: foundDestination.image,
      alt: foundDestination.alt
    }
  })
  return newTripArray
}

const sortTravelerTrips = () => {
 
}

// const createNewTripArray = () => {
//   let foundDestination;
//   const newTripArray = travelerTripRepo.trips.map((trip) => {
//    foundDestination = destinationRepo.getDestinationById(trip.destinationID);
//     return {
//       startDate: dayjs(trip.date).toString().slice(0, 16),
//       duration: trip.duration,
//       destination: foundDestination.destination,
//       image: foundDestination.image,
//       alt: foundDestination.alt
//     }
//   })
//   return newTripArray
// }

const displayTrips = (time) => {
  console.log(sortTravelerTrips())
  const tripsDisply = createNewTripArray().forEach((trip) => {
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
        <h3 class="attachment-number" id="number">Trip Duration: ${trip.duration} Days</h3>
      </div>
    </div>` 
  })
  return tripsDisply
}

// Event Listeners 
window.addEventListener("load", retrieveApiData("load"));
tripInfoButtons[0].addEventListener('click', displayTrips('past'));
// tripInfoButtons[1].addEventListener('click', displayTrips('present'));
// tripInfoButtons[2].addEventListener('click', displayTrips('future'));
// tripInfoButtons[3].addEventListener('click', displayTrips('pending'));


/* <article class="mini-box">
  <div class="box-images">
    <img class="poster" src="./assets/scifi-poster.avif"  alt="Space-movie">
    <img class="share" src="./assets/individual-share.png" alt="Individual-Share">
    <label class="views">Views</label>
    <h1 class="view-count" id="number">04</h1>
  </div>
  <div class="box-name">
    <h4 class="recipeint-name">Name Here</h4>
    <label class="date">Sunday 05/29/22 11:10AM</label>
  </div>
  <div class="box-link">
    <label class="link">http://www.example. com/movie</lable>
  </div>
  <div class="box-footer">
    <div>
      <label class="playlist">Playlist</label>
      <h4 class="playlist-name">Name of Playlist</h4>
    </div>
    <div>
      <p class="attachments">Attachements</p>
      <h3 class="attachment-number" id="number">04</h3>
    </div>
  </div>
</article> */