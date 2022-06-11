import chai from 'chai';
const expect = chai.expect;
import { TripRepo } from '../src/TripRepo';
import { trips } from '../src/data/Trip-sample-data';

describe('TravelerRepo', () => {
  let tripRepo1
  let tripRepo2
  beforeEach(() => {
    tripRepo1 = new TripRepo([trips[0], trips[1], trips[2]]);
    tripRepo2 = new TripRepo([trips[3], trips[4]], trips[5]);
  });

  it('should be a function.', () => {
    expect(TripRepo).to.be.a('function');
  });

  it('should be an instance of trip', () => {
    expect(trip1).to.be.an.instanceof(Trip);
    expect(trip2).to.be.an.instanceof(Trip);
    expect(trip3).to.be.an.instanceof(Trip);
  });

  // it('should have an id.', () => {
  //   expect(trip1.id).to.equal(1);
  //   expect(trip2.id).to.equal(2);
  //   expect(trip3.id).to.equal(40);
  // });


});
