const { expect, assert } = require('chai');
const { describe, it } = require('mocha');
const joiError = require('../../../../src/libraries/error/joi.error');

const {
  invalidFields,
  unevaluatedFields,
} = joiError;

describe('Test for Joi errors response', () => {
  it('Unevaluated Filelds without parameters ', () => {
    const result = unevaluatedFields(undefined);
    expect(result).to.be.an('object');

    expect(result).to.have.property('code');
    expect(result).to.have.property('message');
    expect(result).to.have.property('handled');

    assert.typeOf(result.code, 'string');
    assert.typeOf(result.message, 'string');
    assert.typeOf(result.handled, 'boolean');
  });

  it('Unevaluated Filelds without parameters ', () => {
    const result = unevaluatedFields('BODY');
    expect(result).to.be.an('object');

    expect(result).to.have.property('code');
    expect(result).to.have.property('message');
    expect(result).to.have.property('handled');

    assert.typeOf(result.code, 'string');
    assert.typeOf(result.message, 'string');
    assert.typeOf(result.handled, 'boolean');
  });

  it('Test invalid fields without params', () => {
    const result = invalidFields();
    expect(result).to.be.an('object');

    expect(result).to.have.property('code');
    expect(result).to.have.property('message');
    expect(result).to.have.property('handled');

    assert.typeOf(result.code, 'string');
    assert.typeOf(result.message, 'string');
    assert.typeOf(result.handled, 'boolean');

    assert.equal(result.message, 'The request have unvalidated data');
  });

  it('Test invalid fields', () => {
    const errorStack = {
      message: 'Unvalidated request data',
    };

    const result = invalidFields(errorStack, 'BODY');
    expect(result).to.be.an('object');

    expect(result).to.have.property('code');
    expect(result).to.have.property('message');
    expect(result).to.have.property('handled');

    assert.typeOf(result.code, 'string');
    assert.typeOf(result.message, 'string');
    assert.typeOf(result.handled, 'boolean');

    assert.equal(result.message, 'Unvalidated request data');
  });
});
