const chai = require('chai');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const serverModule = require('../../../server');
const Concert = require('../../../models/concert.model');
const Seat = require('../../../models/seat.model');

const { server } = serverModule;
const { dbURI } = serverModule;

chai.use(chaiHttp);

const { expect } = chai;
const { request } = chai;

describe('GET /api/concerts', async () => {
  before(async (done) => { //eslint-disable-line
    mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.once('open', () => {
      done();
      console.log('Connected to the database');
    });
    db.on('error', err => {
      console.log(`Error ${err}`);
    });
  });
  beforeEach(async () => { //eslint-disable-line
    const testConOne = new Concert({
      _id: '5d9f1140f10a81216cfd4408',
      performer: 'John Doe',
      genre: 'Rock n Roll',
      price: '20',
      day: '1',
      image: 'test.jpg',
      ticket: 1,
    });
    await testConOne.save();

    const testConTwo = new Concert({
      _id: '5d9f1159f81ce8d1ef2bee48',
      performer: 'Jane Doe',
      genre: 'Pop',
      price: '40',
      day: '2',
      image: 'test2.jpg',
      ticket: 2,
    });
    await testConTwo.save();

    const testConThree = new Concert({
      _id: '5d9f1159f1ghj2k33f2bee50',
      performer: 'Zack Doe',
      genre: 'Soul',
      price: '30',
      day: '3',
      image: 'test3.jpg',
      ticket: 3,
    });
    await testConThree.save();
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(3);
  });

  after(async () => { //eslint-disable-line 
    await Concert.deleteMany();
  });
});
