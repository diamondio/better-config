var assert = require('assert');
var config = require('../');

describe('setting', function () {

  it('should set by object', function () {
    config.set({ x: 1 });
    assert.equal(config.x, 1);
  })

  it('should set by json', function () {
    config.set('./fixtures/config.json');
    assert.equal(config.y, 2);
  })
  
  it('should set by json 5', function () {
    config.set('./fixtures/config.json5');
    assert.equal(config.y, 2);
  })
  
  it('should set by js', function () {
    config.set('./fixtures/defaults.js');
    assert.equal(config.z, 3);
  })

  it('should set multiple', function () {
    config.set({ a: 1 });
    config.set({ b: 2 });
    config.set({ a: 3 });
    assert.equal(config.a, 3);
    assert.equal(config.b, 2);
  })

  it('should set by function', function () {
    config.set(function () {
      return { sum: 1+2 }
    });
    assert.equal(config.sum, 3);
  })

  it('should set nested', function () {
    config.set({ c: { d: 1 } });
    config.set({ f: [{ g: 'a' }] });
    config.set({ c: { d: 2, e: 3 } });
    config.set({ f: [{ h: 'b' }] });
    assert.ok(!config.f[0].g);
    assert.equal(config.f[0].h, 'b');
    assert.equal(config.c.d, 2);
    assert.equal(config.c.e, 3);
  })

})

describe('getting', function () {

  it ('should get by object', function () {
    config.set({ i: { j: [{ k: 1 }] } });
    assert.equal(config.i.j[0].k, 1);
  })
  
  it ('should get with function', function () {
    config.set({ i: { j: [{ k: 1 }] } });
    assert.equal(config.get('i.j.0.k'), 1);
  })

})
