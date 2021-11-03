'use strict';

const once = require('lodash.once');
const MapLibreDirections = require('..');

function setup() {
  var container = document.createElement('div');
  var map = new mapboxgl.Map({ container: container, style: {
  "version": 8,
  "sources": {
  },
  "glyphs": "local://glyphs/{fontstack}/{range}.pbf",
  "layers": [
      {
          "id": "background", "type": "background",
          "paint": {
              "background-color": "#fff"
          }
      }] }});

  return map;
}

test('directions', done => {
  tt.test('initialized', t => {
    var map = setup();
    var directions = new MapLibreDirections();
    map.addControl(directions);

    expect(directions).toBeTruthy();
  });

  tt.test('set/get inputs', t => {
    var map = setup();

    var directions = new MapLibreDirections({
      geocoder: {
        proximity: [-79.45, 43.65]
      }
    });
    map.addControl(directions);


    directions.setOrigin('Queen Street NY');
    directions.setDestination([-77, 41]);

    directions.on('origin', (e) => {
      expect(directions.getOrigin()).toBeTruthy();
      expect(e.feature).toBeTruthy();
    });

    directions.on('destination', (e) => {
      expect(directions.getDestination()).toBeTruthy();
      expect(e.feature).toBeTruthy();
    });

    directions.on('route', once((e) => {
      expect(e.route).toBeTruthy();
      done();
    }));

  });

  tt.end();
});

test('Directions with custom styles', () => {
  var map = setup();
  var customLayer = {
    'id': 'directions-route-line',
    'type': 'line',
    'source': 'directions',
    'filter': [
      'all',
      ['in', '$type', 'LineString'],
      ['in', 'route', 'selected']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#3bb2d0',
      'line-width': 4
    }
  };
  var directions = new MapLibreDirections({
    styles: [customLayer]
  });
  expect(map.addControl(directions)).toBeTruthy();
  map.on('load', ()=>{
    expect(map.getLayer('directions-route-line-alt')).toBeTruthy();
    expect(map.getLayer('directions-route-line').serialize()).toEqual(customLayer);
  })
});


test('Directions#onRemove', done => {
  var map = setup();
  var directions = new MapLibreDirections({
    geocoder: {
      proximity: [-79.45, 43.65]
    }
  });
  map.addControl(directions);


  directions.setOrigin('Queen Street NY');
  directions.setDestination([-77, 41]);
  directions.on('route', once(()=>{
    expect(!!map.getSource('directions')).toBeTruthy();
    map.removeControl(directions);
    expect(!!map.getSource('directions')).toBeFalsy();
    done();
  }));
});
