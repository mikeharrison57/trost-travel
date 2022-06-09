import chai from 'chai';
const expect = chai.expect;
import { Traveler } from '../src/Traveler';
import { travelers } from '../src/data/Traveler-sample-data';

describe('Traveler', () => {
  let traveler1;
  let traveler2;
  let traveler3;
  beforeEach(() => {
    traveler1 = new Traveler(travelers[0]);
    traveler2 = new Traveler(travelers[2]);
    traveler3 = new Traveler(travelers[4]);
  });
  it('should be a function.', () => {
    expect(Traveler).to.be.a('function');
  });

  it("should be an instance of Traveler", () => {
    expect(traveler1).to.be.an.instanceof(Traveler);
    expect(traveler2).to.be.an.instanceof(Traveler);
    expect(traveler3).to.be.an.instanceof(Traveler);
  });

  it('should have a user id.', () => {
    expect(traveler1.id).to.equal(1);
    expect(traveler2.id).to.equal(3);
    expect(traveler3.id).to.equal(5);
  });

  it('should have a name.', () => {
    expect(traveler1.name).to.equal('Ham Leadbeater');
    expect(traveler2.name).to.equal('Sibby Dawidowitsch');
    expect(traveler3.name).to.equal('Tiffy Grout');
  });

  it('should have a traveler type.', () => {
    expect(traveler1.travelerType).to.equal('relaxer');
    expect(traveler2.travelerType).to.equal('shopper');
    expect(traveler3.travelerType).to.equal('thrill-seeker');
  });

  it("should return a travler's id.", () => {
    expect(traveler1.getTravelerId()).to.equal(1);
    expect(traveler2.getTravelerId()).to.equal(3);
    expect(traveler3.getTravelerId()).to.equal(5);
  });
});
