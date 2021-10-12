const { expect } = require('chai');
const { describe, it } = require('mocha');
const { createToken } = require('../../../../src/providers/authentication/authentication.provider');

describe('Test for authentication provider', () => {
  it('Test for create token provider', () => {
    const user = {
      userId    : 1,
      username  : 'test',
      level     : 'superuser',
      camerasId : '[]',
      pagesId   : '[]',
    };

    const result = createToken(user, true);

    expect(result).to.have.keys('token', 'expirationDate');
    expect(result.token).to.be.a('string');
    expect(result.expirationDate).to.be.a('string');
  });
});
