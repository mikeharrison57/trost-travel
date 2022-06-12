// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// An example of how you tell webpack to use a CSS (SCSS) file

// Imports
import './css/styles.css';
import {requestApiData} from './api-calls.js';

// Query Selectors

// Class Instances
let travelerRepo, destinationRepo, tripRepo;

// Global Variables


// Functions

// const retrieveApiData = () => {
//   Promise.all([
//     requestApiData('trips'),
//     requestApiData('travelers'),
//     requestApiData('destinations')
//   ]).then(data => instantiateClasses(data));
// }

// const instantiateClasses = data => {
//   tripRepo = data[0].trips;
//   console.log(tripRepo)
// }
// retrieveApiData()