var frisby = require('../src/frisby');

// Setup and use mocks
var mocks = require('./fixtures/http_mocks');

var testHost = 'http://api.example.com';

describe('Frisby nested calls', function() {

  it('should allow nested tosses', function(doneFn) {
    mocks.use(['getUser1', 'deleteUser1']);
    var frisbyCount = 0;

    // Fetch user
    frisby.fetch(testHost + '/users/1')
      .expect('status', 200)
      .then(function(response) {
        frisbyCount++;

        // THEN delete the same user
        frisby.del(testHost + '/users/1')
          .expect('status', 204)
          .then(function() {
            frisbyCount++;
            expect(frisbyCount).toEqual(2);
          })
          .then(doneFn);
      });
  });

});
