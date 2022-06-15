// Imports
import "./css/styles.css";
import { requestApiData, postNewTrip, requestTraveler } from "./api-calls.js";
import { TripRepo } from "../src/TripRepo";
import { TravelerRepo } from "../src/TravelerRepo";
import { DestinationRepo } from "../src/DestinationRepo";
const dayjs = require("dayjs");

// Query Selectors
const travelerGreeting = document.querySelector("#travelerGreeting");
const tripCostThisYear = document.querySelector("#tripCostThisYear");
const pastTripDisplay = document.querySelector("#pastTripInfo");
const presentTripDisplay = document.querySelector("#presentTripInfo");
const pendingTripDisplay = document.querySelector("#pendingTripInfo");
const futureTripDisplay = document.querySelector("#futureTripInfo");
const destinationSelector = document.querySelector("#destinationSelect");
const submitButton = document.querySelector("#confirmBtn");
const tripEstimate = document.querySelector("#tripEstimate");
const formInputs = document.querySelectorAll(".trip-input");
const destinationSelect = document.querySelector("select");
const estimateTripCostBtn = document.querySelector("#estimateTripCost");
const loginPage = document.querySelector("#loginPage");
const header = document.querySelector("#header");
const mainPage = document.querySelector("#mainPage");
const loginButton = document.querySelector(".login-button");
const logoutButton = document.querySelector("#logout");
const allInputs = document.querySelectorAll('input');

// Class Instances
let tripRepo, travelerRepo, destinationRepo, travelerTripRepo;

// Global Variables
let travelerData, destinationData, tripData, travelerId, travelerTrips;

// Login Page Functions
const show = (element) => {
  element.classList.remove("hidden");
};

const hide = (element) => {
  element.classList.add("hidden");
};

const authenticateUsername = (username) => {
  const usernameWord = username.value.substring(0, 8);
  const usernameID = username.value.substring(8);
  if (username.value === "") {
    alert("Username required");
  } else if (
    usernameWord === "traveler" &&
    usernameID <= 50 &&
    usernameID >= 1
  ) {
    return usernameID;
  } else {
    alert("Username does not exist!");
  }
};

const authenticatePassword = (password) => {
  if (password.value === "") {
    alert("Password required");
  } else if (password.value !== "travel") {
    alert("Invalid password");
  } else if (password.value === "travel") {
    return true;
  }
};

const loginToPage = (event) => {
  event.preventDefault();
  const userId = authenticateUsername(event.target.form[0]);
  const userPassword = authenticatePassword(event.target.form[1]);
  requestTraveler(userId).then((data) => {
    travelerId = data[0].id;
    pastTripDisplay.innerHTML = "";
    presentTripDisplay.innerHTML = "";
    pendingTripDisplay.innerHTML = "";
    futureTripDisplay.innerHTML = "";
    retrieveApiData(travelerId);
    hide(loginPage);
    show(header);
    show(mainPage);
  });
};

const logoutOfPage = () =>{
  event.preventDefault()
  show(loginPage);
  hide(header);
  hide(mainPage);
  clearInputs();
  submitButton.classList.add("disabled");
}

// API Functions
const retrieveApiData = () => {
  Promise.all([
    requestApiData("trips"),
    requestApiData("travelers"),
    requestApiData("destinations"),
  ]).then((data) => instantiateClasses(data));
};

const instantiateClasses = (data) => {
  tripData = data[0].trips;
  travelerData = data[1].travelers;
  destinationData = data[2].destinations;
  tripRepo = new TripRepo(tripData);
  travelerRepo = new TravelerRepo(travelerData);
  destinationRepo = new DestinationRepo(destinationData);
  renderPageData();
};

const createPostObjects = (form) => {
  return {
    id: parseInt(tripRepo.trips.length + 1),
    userID: parseInt(travelerId),
    destinationID: parseInt(form[1].value),
    travelers: parseInt(form[3].value),
    date: dayjs(form[0].value).format("YYYY/MM/DD"),
    duration: parseInt(form[2].value),
    status: "pending",
    suggestedActivities: [],
  };
};

const postTripData = (event) => {
  event.preventDefault();
  let postObject = createPostObjects(event.target.form);
  if (formInputs[0] != null || formInputs[1] != null) {
    postNewTrip(postObject).then(() => {
      pastTripDisplay.innerHTML = "";
      presentTripDisplay.innerHTML = "";
      pendingTripDisplay.innerHTML = "";
      futureTripDisplay.innerHTML = "";
      retrieveApiData(travelerId);
      clearInputs();
      submitButton.classList.add("disabled");
    });
  } else if (formInputs[0] === null || formInputs[1] === null) {
    alert('You must fill out all inputs to submit at trip!')
  }
};

// Helper Function
const renderPageData = () => {
  welcomeTraveler();
  sortTravelerTrips();
  sumTripCostThisYear();
  displayTripCostThisYear();
  displayPastTrips();
  displayPendingTrips();
  displayUpcomingTrips();
  setUpDestinationSelect();
  displayEstimatedTripCost();
  displayPresentTrips();
};

const clearInputs = () => {
  const clearInput = allInputs.forEach((input) => {
    input.value = '';
  })
  return clearInput
}

// Traveler Function
const welcomeTraveler = () => {
  travelerGreeting.innerHTML = `Welcome ${travelerRepo.returnTravelerFirstName(
    travelerId
  )}! Would you like to plan a trip today?`;
};

//Trip Functions
const sortTravelerTrips = () => {
  travelerTrips = tripRepo.trips.filter((trip) => trip.userID === travelerId);
  travelerTripRepo = new TripRepo(travelerTrips);
  travelerTripRepo.getPastTrips();
  travelerTripRepo.getPresentTrips();
  travelerTripRepo.getPendingTrips();
  travelerTripRepo.getFutureTrips();
};

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
      estimatedFlightCostPerPerson:
        foundDestination.estimatedFlightCostPerPerson,
    };
  });
  return pastTripInfo;
};

const createPresentTripObjects = () => {
  sortTravelerTrips();
  let foundDestination;
  const presentTripInfo = travelerTripRepo.presentTrips.map((trip) => {
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
      estimatedFlightCostPerPerson:
        foundDestination.estimatedFlightCostPerPerson,
    };
  });
  return presentTripInfo;
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
      estimatedFlightCostPerPerson:
        foundDestination.estimatedFlightCostPerPerson,
    };
  });
  return pendingTripInfo;
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
      estimatedFlightCostPerPerson:
        foundDestination.estimatedFlightCostPerPerson,
    };
  });
  return futureTripInfo;
};

const sumTripCostThisYear = () => {
  const pastAndFutureTrips = createPastTripObjects().concat(
    createFutureTripObjects()
  );
  const userTripsThisYear = pastAndFutureTrips.filter(
    (trip) => trip.startDate.includes("2022") && trip.status === "approved"
  );
  const tripCostThisYearSum = userTripsThisYear.reduce((acc, trip) => {
    const baseTripCost =
      trip.estimatedFlightCostPerPerson * trip.travelers +
      trip.estimatedLodgingCostPerDay * trip.duration;
    const travelAgentFee = baseTripCost * 0.1;
    const totalTripCost = baseTripCost + travelAgentFee;
    return acc + totalTripCost;
  }, 0);
  return tripCostThisYearSum;
};

const estimateTripCost = () => {
  let newTripDestination = destinationRepo.getDestinationById(
    parseInt(destinationSelect.value)
  );
  let newTripDuration = parseInt(formInputs[0].value);
  let newTripTravelers = parseInt(formInputs[1].value);
  let newTripCost =
    newTripDestination.estimatedFlightCostPerPerson * newTripTravelers +
    newTripDestination.estimatedLodgingCostPerDay * newTripDuration * 1.1;
  return newTripCost;
};

const displayEstimatedTripCost = (event) => {
  event.preventDefault();
  alert(`Thank you for your selections! Your estimated trip cost is ${estimateTripCost()}
  Click CONFIRM TRIP to submit trip details.`)
  tripEstimate.innerHTML = `This trip will cost $${estimateTripCost()}`;
  submitButton.removeAttribute("disabled");
};

const displayTripCostThisYear = () => {
  tripCostThisYear.innerHTML = `You've spent $${sumTripCostThisYear()}.00 on trips this year!`;
};

const displayPastTrips = () => {
  const pastTrips = createPastTripObjects().forEach((trip) => {
    pastTripDisplay.innerHTML += 
`<article class="trip-box">
    <div class="box-image">
      <img class="poster" src="${trip.image}"  alt="${trip.alt}">
    </div>
    <div tabindex="0" class="box-info">
      <h3>Destination: ${trip.destination}</h3>
      <p>Start Date: ${trip.startDate}</p>
      <p>${trip.duration} Days</p>
      <h4>Status: ${trip.status}</h4>
    </div>
  </article>` 
  })
  return pastTrips
};

const displayPresentTrips = () => {
  console.log(createPresentTripObjects())
  const presentTrips = createPresentTripObjects().forEach((trip) => {
    presentTripDisplay.innerHTML +=
    `<article class="trip-box">
        <div class="box-image">
          <img class="poster" src="${trip.image}"  alt="${trip.alt}">
        </div>
        <div tabindex="0" class="box-info">
          <h3>Destination: ${trip.destination}</h3>
          <p>Start Date: ${trip.startDate}</p>
          <p>${trip.duration} Days</p>
          <h4>Status: ${trip.status}</h4>
        </div>
      </article>` 
  })
  return presentTrips
};

const displayPendingTrips = () => {
  const pendingTrips = createPendingTripObjects().forEach((trip) => {
    pendingTripDisplay.innerHTML +=
    `<article class="trip-box">
    <div class="box-image">
      <img class="poster" src="${trip.image}"  alt="${trip.alt}">
    </div>
    <div tabindex="0" class="box-info">
      <h3>Destination: ${trip.destination}</h3>
      <p>Start Date: ${trip.startDate}</p>
      <p>${trip.duration} Days</p>
      <h4>Status: ${trip.status}</h4>
    </div>
  </article>` 
  })
  return pendingTrips
};

const displayUpcomingTrips = () => {
  const futureTrips = createFutureTripObjects().forEach((trip) => {
    if(trip.status === 'approved') {
      futureTripDisplay.innerHTML +=
      `<article class="trip-box">
      <div class="box-image">
        <img class="poster" src="${trip.image}"  alt="${trip.alt}">
      </div>
      <div tabindex="0" class="box-info">
        <h3>Destination: ${trip.destination}</h3>
        <p>Start Date: ${trip.startDate}</p>
        <p>${trip.duration} Days</p>
        <h4>Status: ${trip.status}</h4>
      </div>
    </article>` 
    }
    })
  return futureTrips
};

//Destination Function
const setUpDestinationSelect = () => {
  destinationRepo.destinations.forEach((destination) => {
    destinationSelector.innerHTML += `<option value="${destination.id}">${destination.destination}</option>`;
  });
};

// Event Listeners
submitButton.addEventListener("click", postTripData);
estimateTripCostBtn.addEventListener("click", displayEstimatedTripCost);
loginButton.addEventListener("click", loginToPage);
logoutButton.addEventListener('click', logoutOfPage);