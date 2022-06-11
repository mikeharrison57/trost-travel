import chai from 'chai';
const expect = chai.expect;
import { TravelerRepo } from '../src/Traveler';
import { travelers } from '../src/data/Traveler-sample-data';

describe('TravelerRepo', () => {
  let travelerRepo1
  let travelerRepo2
  beforeEach(() => {
    travelerRepo1 = new TravelerRepo([travelers[0], travelers[1], travelers[2]]);
    travelerRepo2 = new TravelerRepo([travelers[3], travelers[4]]);
  });

  it('should be a function.', () => {
    expect(TravelerRepo).to.be.a('function');
  });

  it('should be an instance of TravelerRepo', () => {
    expect(travelerRepo1).to.be.an.instanceof(TravelerRepo);
    expect(travelerRepo2).to.be.an.instanceof(TravelerRepo);
  });

  it('should have a certain amount of travelers in the repo.', () => {
    expect(travelerRepo1.travelers.length).to.equal(3);
    expect(travelerRepo2.travelers.length).to.equal(2);
  });

  it('should have a traveler with an id of 1 at index postion 0.', () => {
    expect(travelerRepo1.travelers[0].id).to.equal(1);
  });

  it('should have a traveler with an id of 5 at index postion 1.', () => {
    expect(travelerRepo2.travelers[1].id).to.equal(5);
  });

  it('should be able to return a travler by their id.', () => {
    expect(travelerRepo1.getTravelerById(2)).to.deep.equal(
      {
        id: 2, 
        name: "Rachael Vaughten",
        travelerType: "thrill-seeker"
      });
    expect(travelerRepo2.getTravelerById(4)).to.deep.equal(
      {
        id: 4,
        name: "Leila Thebeaud",
        travelerType: "photographer"
      });
  });

  it("should be able to return a travler's first name.", () => {
    expect(travelerRepo1.returnTravelerFirstName(3)).to.equal('Sibby');
    expect(travelerRepo2.returnTravelerFirstName(5)).to.equal('Tiffy');
  });
});
