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

// Class Instances
let tripRepo, travelerRepo, destinationRepo; 

// Global Variables
let travelerData, destinationData, tripData;


// Functions
const getRandomTraveler = repo => {
  return Math.floor(Math.random() * repo.length + 1);
};

const retrieveApiData = (travelerId) => {
  Promise.all([
    requestApiData('trips'),
    requestApiData('travelers'),
    requestApiData('destinations')
  ]).then(data => instantiateClasses(data, travelerId));
};

const instantiateClasses = (data, travelerId) => {
  tripData = data[0].trips;
  travelerData = data[1].travelers;
  destinationData = data[2].destinations;
  let id;
  if (travelerId === 'load') {
    id = getRandomTraveler(travelerData)
  } else {
    id = travelerId
  }
  tripRepo = new TripRepo(tripData);
  travelerRepo = new TravelerRepo(travelerData);
  destinationRepo = new DestinationRepo(destinationData);
  console.log(destinationRepo)
}
retrieveApiData()

// Event Listeners 
window.addEventListener("load", retrieveApiData("load"))