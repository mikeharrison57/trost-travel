import chai from 'chai';
const expect = chai.expect;
import { TripRepo } from '../src/TripRepo';
import { trips } from '../src/data/Trip-sample-data';
const dayjs = require('dayjs');

describe('TripRepo', () => {
  let tripRepo1;
  let tripRepo2;
  beforeEach(() => {
    tripRepo1 = new TripRepo([trips[0], trips[1], trips[2]]);
    tripRepo2 = new TripRepo([trips[3], trips[4], trips[5]]);
  });

  it('should be a function.', () => {
    expect(TripRepo).to.be.a('function');
  });

  it('should be an instance of TripRepo', () => {
    expect(tripRepo1).to.be.an.instanceof(TripRepo);
    expect(tripRepo2).to.be.an.instanceof(TripRepo);
  });

  it('should have a certain amount of trips in the repo.', () => {
    expect(tripRepo1.trips.length).to.equal(3);
    expect(tripRepo2.trips.length).to.equal(3);
  });

  it('should have a trip with an id of 35 at index postion 0.', () => {
    expect(tripRepo1.trips[0].id).to.equal(35);
  });

  it('should have a traveler with an id of 53 at index postion 1.', () => {
    expect(tripRepo2.trips[1].id).to.equal(53);
  });

  it('should be able to convert the format of trip dates in the repo.', () => {
    expect(tripRepo1.convertTripDates()).to.deep.equal([
      {
        id: 35,
        userID: 36,
        destinationID: 1,
        travelers: 3,
        date: '2022-10-23',
        duration: 16,
        status: 'pending',
        suggestedActivities: []
      },
      {
        id: 125,
        userID: 19,
        destinationID: 2,
        travelers: 4,
        date: '2022-12-22',
        duration: 15,
        status: 'approved',
        suggestedActivities: []
      },
      {
        id: 102,
        userID: 3,
        destinationID: 3,
        travelers: 3,
        date: dayjs().format('YYYY-MM-DD'),
        duration: 8,
        status: 'approved',
        suggestedActivities: []
      }   
    ]);
    expect(tripRepo2.convertTripDates()).to.deep.equal([
      {
        id: 124,
        userID: 46,
        destinationID: 3,
        travelers: 6,
        date: dayjs().format('YYYY-MM-DD'),
        duration: 16,
        status: 'pending',
        suggestedActivities: []
      },
      {
        id: 53,
        userID: 27,
        destinationID: 4,
        travelers: 6,
        date: '2020-01-03',
        duration: 20,
        status: 'approved',
        suggestedActivities: []
      },
      {
        id: 92,
        userID: 30,
        destinationID: 4,
        travelers: 2,
        date: '2020-12-24',
        duration: 16,
        status: 'approved',
        suggestedActivities: []
      }
    ]);
  });

  it('should be able to get trips from the past.', () => {
    expect(tripRepo1.getPastTrips()).to.deep.equal([ ]);
    expect(tripRepo2.getPastTrips()).to.deep.equal([
      {
        id: 53,
        userID: 27,
        destinationID: 4,
        travelers: 6,
        date: '2020-01-03',
        duration: 20,
        status: 'approved',
        suggestedActivities: []
      },
      {
        id: 92,
        userID: 30,
        destinationID: 4,
        travelers: 2,
        date: '2020-12-24',
        duration: 16,
        status: 'approved',
        suggestedActivities: []
      }
    ]);
  });

  it('should be able to get trips from the present.', () => {
    expect(tripRepo1.getPresentTrips()).to.deep.equal([
      {
        id: 102,
        userID: 3,
        destinationID: 3,
        travelers: 3,
        date: dayjs().format('YYYY-MM-DD'),
        duration: 8,
        status: 'approved',
        suggestedActivities: []
      }
    ]);
    expect(tripRepo2.getPresentTrips()).to.deep.equal([
      {
        id: 124,
        userID: 46,
        destinationID: 3,
        travelers: 6,
        date: dayjs().format('YYYY-MM-DD'),
        duration: 16,
        status: 'pending',
        suggestedActivities: []
      }
    ]);
  });

  it('should be able to get trips from the future.', () => {
    expect(tripRepo1.getFutureTrips()).to.deep.equal([ 
      {
        id: 35,
        userID: 36,
        destinationID: 1,
        travelers: 3,
        date: '2022-10-23',
        duration: 16,
        status: 'pending',
        suggestedActivities: []
      },
      {
        id: 125,
        userID: 19,
        destinationID: 2,
        travelers: 4,
        date: '2022-12-22',
        duration: 15,
        status: 'approved',
        suggestedActivities: []
      }
    ]);
    expect(tripRepo2.getFutureTrips()).to.deep.equal([ ]);
  });

  it('should be able to get pending trips', () => {
    expect(tripRepo1.getPendingTrips()).to.deep.equal([
      {
        id: 35,
        userID: 36,
        destinationID: 1,
        travelers: 3,
        date: '2022-10-23',
        duration: 16,
        status: 'pending',
        suggestedActivities: []
      }
    ]);
    expect(tripRepo2.getPendingTrips()).to.deep.equal([
      {
        id: 124,
        userID: 46,
        destinationID: 3,
        travelers: 6,
        date: dayjs().format('YYYY-MM-DD'),
        duration: 16,
        status: 'pending',
        suggestedActivities: []
      }
    ]);
  });

  it('should be able to calculate the cost of trips', () => {
    expect(tripRepo1.calculateTripCost(1)).to.equal(2552);
    expect(tripRepo1.calculateTripCost(2)).to.equal(5082);
    expect(tripRepo1.calculateTripCost(3)).to.equal(4279);
    expect(tripRepo2.calculateTripCost(4)).to.equal(3740);
  });
  
});
