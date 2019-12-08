require('should');

const request = require('supertest');
const mogoose = require('mongoose');

process.env.ENV = "Test";

const app = require('../app.js');

const Book = mogoose.model('Book');
const agent = request.agent(app);

describe('Book Crud Test', () => {
  it('should allow a book to be posted and return read and _it', (done) => {
    const bookPost = {title: 'My Book', author: 'Jon', genre: 'Fiction'};

    agent
      .post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        //console.log(results);
        //results.body.read.should.not.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });
  after((done)=>{
    mogoose.connection.close();
    app.server.close(done());
  });
});
