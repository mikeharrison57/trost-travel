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
  trip2 = new Trip(trips[2]);
  trip3 = new Trip(trips[4]);
  });
  
  it('should be a function.', () => {
    expect(Trip).to.be.a('function');
  });
  
});
