import chai from 'chai';
const expect = chai.expect;
import { Destination } from '../src/Destination';
import { destinations } from '../src/data/Destination-sample-data';

describe('Destination', () => {
  let destination1;
  let destination2;
  let destination3;
  beforeEach(() => {
    destination1 = new Destination(destinations[0]);
    destination2 = new Destination(destinations[2]);
    destination3 = new Destination(destinations[4]);
  });
  
  it('should be a function.', () => {
    expect(Destination).to.be.a('function');
  });

});