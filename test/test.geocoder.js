'use strict';

import Geocoder from '../src/controls/geocoder';

test('Geocoder#constructor', () => {
  t.test('default options', t =>{
    const geocoder = new Geocoder({});
    expect(geocoder.api).toBe('https://api.mapbox.com/geocoding/v5/mapbox.places/');
    expect(geocoder.options).toEqual({});
  });

  t.test('placeholder option is assigned to the right places', t =>{
    const geocoder = new Geocoder({
      flyTo: false,
      placeholder: 'foo'
    });

    geocoder.onAdd();
    expect(geocoder._inputEl.getAttribute('placeholder')).toBe('foo');
  });

  // TODO test to confirm the query parameters actually get passed.
  /*
  t.test('query parameters passed are added to the request', t =>{
    const geocoder = new Geocoder({
      language: 'fr',
      country: 'fr'
    });

    geocoder.onAdd();
    geocoder._geocode('san francisco', res => {
      console.log('request assignment!', geocode.request);
    });

    // t.end();
  });
  */

  t.test('Geocoder#api', t => {
    const geocoder = new Geocoder({api: 'https://fake-geocoder.pizza'});
    expect(geocoder.api).toBe('https://fake-geocoder.pizza');
  });
})
