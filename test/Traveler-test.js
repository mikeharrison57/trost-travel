import chai from 'chai';
const expect = chai.expect;
import { TravelerRepo } from '../src/Traveler';
import { travelers } from '../src/data/Traveler-sample-data';

describe('TravelerRepo', () => {
  let travelerRepo
  beforeEach(() => {
    travelerRepo = new TravelerRepo(travelers);
  });
  
  it.only('should be a function.', () => {
    expect(TravelerRepo).to.be.a('function');
  });

  it.only('should be an instance of Traveler', () => {
    expect(travelerRepo).to.be.an.instanceof(TravelerRepo);
  });

  it.only('should have a user id.', () => {
    expect(travelerRepo[0].id).to.equal(1);
    expect(travelerRepo[2].id).to.equal(3);
    expect(travelerRepo[4].id).to.equal(5);
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
