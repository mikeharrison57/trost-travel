import chai from 'chai';
const expect = chai.expect;
import { TripRepo } from '../src/TripRepo';
import { trips } from '../src/data/Trip-sample-data';

describe('TripRepo', () => {
  let tripRepo1
  let tripRepo2
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
    expect(tripRepo1.convertTripDates()).to.deep.equal([ 1666504800000, 1671692400000, 1654840800000 ]);
    expect(tripRepo2.convertTripDates()).to.deep.equal([ 1654840800000, 1578034800000, 1608793200000 ]);
  });

  // it.skip('should be able to return trips from the past.', () => {
  //   expect(tripRepo1.convertTripDates()).to.deep.equal();
  //   expect(tripRepo2.convertTripDates()).to.deep.equal();
  // });


});