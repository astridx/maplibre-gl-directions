'use strict';

const once = require('lodash.once');

test('Directions#inputControl', () => {
  let container, map, directions;

  const changeEvent = document.createEvent('HTMLEvents');
  changeEvent.initEvent('change', true, false);

  const clickEvent = document.createEvent('HTMLEvents');
  clickEvent.initEvent('click', true, false);

  function setup(opts) {
    container = document.createElement('div');
    map = new mapboxgl.Map({ container: container });
    var MapLibreDirections = require('..');
    directions = new MapLibreDirections(opts);
    map.addControl(directions);
  }

  tt.test('profiles', (t) => {
    setup({ profile: 'mapbox/cycling' });
    expect.assertions(3);

    var drivingEl = container.querySelector('#mapbox-directions-profile-driving');
    var cyclingEl = container.querySelector('#mapbox-directions-profile-cycling');

    expect(drivingEl.checked).toBe(false);
    expect(cyclingEl.checked).toBe(true);

    directions.on('profile', once((e) => {
      expect(e.profile).toBe('mapbox/driving');
    }));

    drivingEl.dispatchEvent(changeEvent);
  });

  tt.end();
});

