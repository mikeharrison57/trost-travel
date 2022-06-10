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

  it('should be an instance of Traveler', () => {
    expect(destination1).to.be.an.instanceof(Destination);
    expect(destination2).to.be.an.instanceof(Destination);
    expect(destination3).to.be.an.instanceof(Destination);
  });

  it('should have a user id.', () => {
    expect(destination1.id).to.equal(1);
    expect(destination2.id).to.equal(3);
    expect(destination3.id).to.equal(5);
  });

  it('should have a destination.', () => {
    expect(destination1.destination).to.equal('Lima, Peru');
    expect(destination2.destination).to.equal('Sydney, Austrailia');
    expect(destination3.destination).to.equal('Madrid, Spain');
  });

  it('should have an estimated lodging cost per person.', () => {
    expect(destination1.estimatedLodgingCostPerDay).to.equal(70);
    expect(destination2.estimatedLodgingCostPerDay).to.equal(130);
    expect(destination3.estimatedLodgingCostPerDay).to.equal(150);
  });

  it('should have an estimated flight cost per person.', () => {
    expect(destination1.estimatedFlightCostPerPerson).to.equal(400);
    expect(destination2.estimatedFlightCostPerPerson).to.equal(950);
    expect(destination3.estimatedFlightCostPerPerson).to.equal(650);
  });

  it('should have an image.', () => {
    expect(destination1.image).to.equal('https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80');
    expect(destination2.image).to.equal('https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');
    expect(destination3.image).to.equal('https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');
  });

  it('should have an alt tag for images.', () => {
    expect(destination1.alt).to.equal('overview of city buildings with a clear sky');
    expect(destination2.alt).to.equal('opera house and city buildings on the water with boats');
    expect(destination3.alt).to.equal('city with clear skys and a road in the day time');
  });
});