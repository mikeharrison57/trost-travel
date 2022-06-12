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
let tripRepo, travelerRepo, destinationRepo; 

// Global Variables
let travelerData, destinationData, tripData;

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
  welcomeTraveler()
}

const welcomeTraveler = () => {
  const travelerId = getRandomTraveler(travelerRepo.travelers)
  console.log(travelerRepo.returnTravelerFirstName(travelerId))
  travelerGreeting.innerHTML = `Welcome ${travelerRepo.returnTravelerFirstName(travelerId)}! Would you like to plan a trip today?`
}

// Event Listeners 
window.addEventListener("load", retrieveApiData("load"));