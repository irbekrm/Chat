const mongoose = require('mongoose'),
      auth = require('../routes/auth.js'),
      User = require('../models/user'),
      chai = require('chai'),
      chaiHttp = require('chai-http'),
      server = require('../server'),
      should = chai.should();

chai.use(chaiHttp);

describe('authentication', _ => {
  beforeEach(done => {
    User.remove({}, err => {
      done();
    });
  });

describe('signup', _ => {
  it('should allow a user with unique username to sign up', done => {
    const user = {password: 'haha', username: 'milleV'};
    chai.request(server)
    .post('/auth/signup')
    .send(user)
    .end((err, res) => {
      if(err) console.log('ERROR FROM 1: ', err);
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('auth').eql(true);
      res.body.should.have.property('token');
      res.body.should.have.property('name').eql(user.username);
     done();
     });
   });
  });
  
  describe('signup with invalid username', _ => {
    it('should not allow repeating usernames', done => {
      const user1 = { password: 'Pass123', username: 'milleV' };
      const user2 = { password: 'PassXYZ', username: 'milleV' };
      User.create(user2);
      chai.request(server)
      .post('/auth/signup')
      .send(user1)
      .end((err, res) => {
        if(err) console.log(err);
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('auth').eql(false);
        res.body.should.have.property('message').eql('There was a problem registering the user');
      done();
      })
    })
  });
});
