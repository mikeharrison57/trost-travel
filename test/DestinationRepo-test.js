import chai from 'chai';
const expect = chai.expect;
import { DestinationRepo } from '../src/DestinationRepo';
import { destinations } from '../src/data/Destination-sample-data';

describe('DestinationRepo', () => {
  let destinationRepo1
  let destinationRepo2
  beforeEach(() => {
    destinationRepo1 = new DestinationRepo([destinations[0], destinations[1], destinations[2]]);
    destinationRepo2 = new DestinationRepo([destinations[3], destinations[4]]);
  });
  
  it('should be a function.', () => {
    expect(DestinationRepo).to.be.a('function');
  });

  it('should be an instance of DestinationRepo', () => {
    expect(destinationRepo1).to.be.an.instanceof(DestinationRepo);
    expect(destinationRepo2).to.be.an.instanceof(DestinationRepo);
  });

  it('should have a certain amount of destinations in the repo.', () => {
    expect(destinationRepo1.destinations.length).to.equal(3);
    expect(destinationRepo2.destinations.length).to.equal(2);
  });

  it('should have a destination with an id of 1 at index postion 0.', () => {
    expect(destinationRepo1.destinations[0].id).to.equal(1);
  });

  it('should be able to return a destination by the id.', () => {
    expect(destinationRepo1.getDestinationById(2)).to.deep.equal(
      {
        id: 2,
        destination: "Stockholm, Sweden",
        estimatedLodgingCostPerDay: 100,
        estimatedFlightCostPerPerson: 780,
        image: "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "city with boats on the water during the day time"
      });
    expect(destinationRepo2.getDestinationById(4)).to.deep.equal(
      {
        id: 4,
        destination: "Cartagena, Colombia",
        estimatedLodgingCostPerDay: 65,
        estimatedFlightCostPerPerson: 350,
        image: "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        alt: "boats at a dock during the day time"
      });
    });
    
});