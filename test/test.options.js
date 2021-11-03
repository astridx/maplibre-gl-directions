'use strict';

const once = require('lodash.once');

test('Directions#option', () => {
  let container, map, directions;

  function setup(opts) {
    container = document.createElement('div');
    map = new mapboxgl.Map({ container: container });
    var MapLibreDirections = require('..');
    directions = new MapLibreDirections(opts);
    map.addControl(directions);
  }

  tt.test('option.styles', t => {
    expect.assertions(1);
    setup({
      styles: [{
        'id': 'foo',
        'type': 'circle',
        'source': 'directions',
        'paint': {
          'circle-color': '#f00'
        },
        'filter': [
          'all',
          ['in', '$type', 'Point'],
          ['in', 'marker-symbol', 'A']
        ]
      }]
    });

    directions.setOrigin([-77, 41]);
    directions.on('origin', once(() => {
      expect(map.getLayer('foo')).toBeTruthy();
    }));
  });

  tt.end();
});
