'use strict';

const once = require('lodash.once');

test('Directions#instructionControl', () => {
  let container, map, directions;

  function setup(opts) {
    container = document.createElement('div');
    map = new mapboxgl.Map({ container: container });
    var MapLibreDirections = require('..');
    directions = new MapLibreDirections(opts);
    map.addControl(directions);
  }

  tt.test('displayed', t => {
    setup();
    expect.assertions(2);
    directions.setOrigin([-79, 43]);
    directions.setDestination([-77, 41]);
    directions.on('route', once((e) => {
      expect(e.route).toBeTruthy();
      expect(container.querySelector('.directions-control-directions').textContent).toBeTruthy();
    }));
  });

  tt.test('error', t => {
    setup();
    expect.assertions(1);
    directions.setOrigin('Montreal Quebec');
    directions.setDestination('Toledo Spain');
    directions.on('error', once((e) => {
      expect(e.error).toBeTruthy();
    }));
  });

  tt.end();
});

