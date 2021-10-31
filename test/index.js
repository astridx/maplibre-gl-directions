'use strict';

const test = require('tape');
window.mapboxgl = require('mapbox-gl');
require('../src/index');

// Tests
require('./test.directions');
// require('./test.options');
require('./test.inputs');
require('./test.instructions');
require('./test.geocoder');
require('./test.utils');

// close the smokestack window once tests are complete
test('shutdown', (t) => {
  t.end();
  setTimeout(() => {
    window.close();
  });
});
