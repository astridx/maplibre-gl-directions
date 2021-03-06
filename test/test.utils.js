'use strict';

import utils from '../src/utils';

test('Directions#utils', () => {
  tt.test('roundWithOriginalPrecision', (t) => {
    expect(utils.roundWithOriginalPrecision(11.1000000, 11.1)).toBe('11.1');
    expect(utils.roundWithOriginalPrecision(11.1000000, 11.1000000000)).toBe('11.1');
    expect(utils.roundWithOriginalPrecision(11.1234567, 11.1234567890)).toBe('11.12346');
    expect(utils.roundWithOriginalPrecision(11.0000000, 11)).toBe('11');
  });

  tt.end();
});
