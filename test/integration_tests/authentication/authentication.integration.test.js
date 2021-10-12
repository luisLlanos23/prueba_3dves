const { expect } = require('chai');
const request = require('supertest');
const { describe, it, after } = require('mocha');

const app = require('../../../app');
const config = require('../../../config/config');

describe('Integration test for authentication route', () => {
  const correctDataForRequest = {
    username   : config.authentication.username,
    password   : config.authentication.password,
    rememberme : config.authentication.rememberme,
  };

  const incorrectDataForRequest = {
    username   : config.authentication.username,
    password   : '123456',
    rememberme : config.authentication.rememberme,
  };

  describe('Test for login route', () => {
    it('Test for login route with correct username and password', (done) => {
      request(app)
        .post('/api/authentication/login')
        .send(correctDataForRequest)
        .expect(200)
        .end((error, res) => {
          const { result } = { ...res.body };
          expect(result).to.have.keys('token', 'expirationDate');
          expect(result.token).to.be.a('string');
          expect(result.expirationDate).to.be.a('string');
          done(error);
        });
    });

    it('Test for login route with incorrect username and password', (done) => {
      request(app)
        .post('/api/authentication/login')
        .send(incorrectDataForRequest)
        .expect(401)
        .end((error, res) => {
          const result = { ...res.body };
          expect(result.error).to.be.equal(true);
          expect(result.code).to.be.equal('AUTHENTICATION_ERROR');
          expect(result.message).to.be.equal('Wrong username and/or password');

          done(error);
        });
    });
  });

  after((done) => {
    done();
  });
});
