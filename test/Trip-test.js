import chai from 'chai';
const expect = chai.expect;
import { Trip } from '../src/Trip';
import { trips } from '../src/data/Trip-sample-data';

describe('Trip', () => {
  let trip1;
  let trip2;
  let trip3;
  beforeEach(() => {
    trip1 = new Trip(trips[0]);
    trip2 = new Trip(trips[3]);
    trip3 = new Trip(trips[5]);
  });
  
  it('should be a function.', () => {
    expect(Trip).to.be.a('function');
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
